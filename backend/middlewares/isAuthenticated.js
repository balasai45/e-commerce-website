import jwt from "jsonwebtoken"
export const isAuthenticated=async(req,res,next)=>{
try{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "User not authenticated",
            success: false,
        })
    }
    const decode=jwt.verify(token,process.env.SECRET_KEY);
    req.user.id=decode.userID;
    next();
}catch(error){
    console.log(error);
}
}