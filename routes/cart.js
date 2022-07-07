const Cart = require('../models/Cart');
const { verifyAuthorization, verifyAdmin, verifyToken } = require('./verifyToken');

const router = require('express').Router();

//CREATE CART
router.post('/' , verifyToken , async(req , res) =>{
    const newCart = new Cart(req.body);
    try{

        const savedCart = await newCart.save();
        res.status(200).json(savedCart);

    }catch(err){res.status(500).json(err)}
})



//UPDATE CART
router.put('/:id' , verifyAuthorization ,async (req , res) => {
    try{
        const updatedCart = await Cart.findOneAndUpdate({userId:req.params.id} , {$set:req.body} , {new:true});

        res.status(200).json(updatedCart);
    }catch(err){res.status(500).json(err)}
});


//DELETE CART
router.delete('/:id' , verifyAuthorization ,async (req , res) => {

    try{
        await Cart.findOneAndDelete({userId:req.params.id});
        res.status(200).json('Cart has been deleted.')

    }catch(err){res.status(500).json(err)}
    
});


//GET SINGLE CART
router.get('/find/:id' , verifyAuthorization , async (req , res) => {
    try{
        const cart =  await Cart.findOne({userId:req.params.id});
        res.status(200).json(cart)

    }catch(err){res.status(500).json(err)}
    
});


//GET ALL CARTS
router.get('/' , verifyAdmin , async(req , res) => {
    try{
        
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){res.status(500).json(err)}
})

module.exports = router
