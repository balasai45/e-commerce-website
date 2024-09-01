import express from 'express'
import { register,login } from '../controllers/user.controller.js';
import {addProduct, getProductById, getProducts} from '../controllers/product.controller.js'
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { addCart, clearCart, getCart, removeFromCart } from '../controllers/cart.controller.js';
const Router=express.Router();
Router.route('/register').post(register)
Router.route('/login').post(login)
Router.route('/addProduct').post(isAuthenticated,addProduct)
Router.route('/getAllProduct').get(isAuthenticated,getProducts)
Router.route('/getProductById/:id').get(isAuthenticated,getProductById)
Router.route('/addToCart').post(isAuthenticated,addCart)
Router.route('/getCartDetails').get(isAuthenticated,getCart)
Router.route('/removeFromCart').post(isAuthenticated,removeFromCart)
Router.route('/clearCart').get(isAuthenticated,clearCart)
export default Router