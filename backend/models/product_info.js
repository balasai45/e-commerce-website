import mongoose from "mongoose";
const productSchema= new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    productDescription:{
        type:String,
        required:true,
    },
    productQuantity:{
        type:Number,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productReview:{
        type:Number,
        required:false,
    },
    productImage:{
        type:Image,
        required:true,
    }
})
const productModel= new mongoose.model('productInfo',productSchema)
export default productModel;