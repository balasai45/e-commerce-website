import Cart from '../model/cartSchema.js';
import productModel from '../models/product_info.js';
export const addCart=async(req,res)=>{
    try{
        const userId = req.user.id;  // Assuming user is authenticated and ID is attached to request
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
                totalPrice: product.price * quantity
            });
        } else {
            const existingProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.totalPrice += product.price * quantity;
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error });
    }

}


export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate('productModel');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex >= 0) {
            const product = await productModel.findById(productId);
            cart.totalPrice -= product.price * cart.products[productIndex].quantity;
            cart.products.splice(productIndex, 1);

            await cart.save();
            return res.status(200).json(cart);
        }

        res.status(404).json({ message: 'Product not found in cart' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};


export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error });
    }
};
