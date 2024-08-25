import userInfo from "../models/user_info.js";
export const register=async(req,res)=>{
    try{
        const {firstName,lastName,address, email, phoneNumber, password}=req.body;
        if ( !email || !phoneNumber || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user=await userInfo.findOne({email});
        if(user){
           return res.status(400).json({  message: 'User already exist with this email.',
                success: false,});
        }
        // const hashedPassword=await bcrypt.hash(password,10);
        await userInfo.create({
            firstName,lastName,email,address,phoneNumber,password
        })
        return res.status(201).json( {message: "User created successfully.",
            success: true})

    }
    catch(error){
        console.log(error);
    }
}

export const login= async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({
            message: "Something is missing",
            success: false
        })
    }
   const user= await userInfo.findOne({email:email,password:password})
   console.log("user",user)
   if(user){
    return res.status(200).json({message:"successfully Login", status:true});
   }
   return res.status(404).json({message:"Incorrect Credentials",status:false});
}