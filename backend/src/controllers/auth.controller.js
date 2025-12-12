
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import {ENV} from "../lib/env.js"

import generateToken from "../lib/utils.js";


export const signup = async (req, res) => {
  const {fullName, email, password} = req.body;

   try {
    //yoksa kontrolü..
     if(!fullName || !email || !password){
         return res.status(400).json({message: "Tüm alanların doldurulması zorunludur!"});
     }
       //password kontrolu
     if(password.length < 6){
        return res.status(400).json({message: "Şifre 6 karakterden az olamaz!"});
     }

     //email regex kontrolu
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if(!emailRegex.test(email)){       

        return res.status(400).json({message: "Geçersiz email formatı"});
     }
    //VT email arama
     const user = await User.findOne({email});
     if(user)return res.status(400).json({message: "Bu Email Kullanılmaktadır!"});

   //şifreyi hastlama
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt);

     //yenı kullanıcıyı  oluştur
     const newUser = new User({
        fullName,
        email,
        password : hashedPassword
     })

     if(newUser){
        //kod tavsanından once 
        // generateToken(newUser._id, res)
        // await newUser.save();

           //kod tavsanından sonra 
        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);



        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        });

      //   //EMAİL İÇİN 
        try {
         await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
        } catch (error) {
          console.log("Failed to send velcome email", error);
        }





     }else{
        res.status(400).json({message: "Gecersiz kullanıcı verileri!"});
     }


   } catch (error) {
    console.log("error in signup controller", error);
    res.status(500).json({message: "internet server hatası"});
   }

}