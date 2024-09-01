import productModel from "../models/product_info.js";
export const addProduct=async(req,res)=>{
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
export const getProducts=async(req,res)=>{
    try{
        const products= await productModel.find({});
        res.status(200).json(products);
    }
    catch(error){
        console.log(error)
    }
}
export const getProductById=async(req,res)=>{
    try{
        const id=req.params.id;
        const product=await productModel.findById(id);
        return res.status(200).json(product);
    }catch(error){
        console.log(error)
    }
}