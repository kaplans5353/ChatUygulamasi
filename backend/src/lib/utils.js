import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {

    //tavsandan sonra
    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }


  const token = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn: "7d",

  });

  res.cookie("jwt", token ,{
   maxAge: 7*24*60*60*1000,
   httpOnly: true,
   sameSite: "strict",
   secure:process.env.NODE_ENV === "development" ? false : true
  }); 
  
  return token;



};

export default generateToken;
