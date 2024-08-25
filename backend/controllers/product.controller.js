import productModel from "../models/product_info";
const addProduct=async(req,res)=>{
    try{
    const{productName, productDescription,productQuantity,productPrice, productImage}=req.body;
    await productModel.create({
        productName, productDescription,productQuantity,productPrice, productImage
    });
    return res.status(201).json({message:"Product Successfully Added",status:true});
    }catch(error){
    console.log('error',error);
    return res.status(400).json({message:"Something Went Wrong", status:false});
    }
}