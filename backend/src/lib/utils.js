import jwt from "jsonwebtoken";
import {ENV} from "./env.js"

const generateToken = (userId, res) => {

    //tavsandan sonra
    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

//BURDA ENV HATASI OLABILIR videoda JWT_SECRET böyle
  const token = jwt.sign({userId}, ENV.JWT_SECRET,{
    expiresIn: "7d",

  });

  res.cookie("jwt", token ,{
   maxAge: 7*24*60*60*1000,
   httpOnly: true,
   sameSite: "strict",
   secure:ENV.NODE_ENV === "development" ? false : true
  }); 
  
  return token;



};

export default generateToken;
