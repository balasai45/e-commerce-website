import mongoose from "mongoose";

const connectDatabase=()=>{mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("successfully connected");
}).catch(()=>{
    console.log("Database Connection Failure");
})}
export default connectDatabase