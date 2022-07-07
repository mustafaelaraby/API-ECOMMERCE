const Product = require('../models/Product');
const { verifyAuthorization, verifyAdmin } = require('./verifyToken');

const router = require('express').Router();


//CREATE PRODUCT
router.post('/' , verifyAdmin , async(req , res) =>{
    const newProduct = new Product(req.body);
    try{

        const savedUser = await newProduct.save();
        res.status(200).json(savedUser);

    }catch(err){res.status(500).json(err)}
})


//UPDATE PRODUCT
router.put('/:id' , verifyAdmin ,async (req , res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id , {$set:req.body} , {new:true});

        res.status(200).json(updatedProduct);
    }catch(err){res.status(500).json(err)}
});


//DELETE PRODUCT
router.delete('/:id' , verifyAdmin ,async (req , res) => {

    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted.')

    }catch(err){res.status(500).json(err)}
    
});


//GET SINGLE PRODUCT
router.get('/find/:id' ,async (req , res) => {
    try{
        const product =  await Product.findById(req.params.id);
        res.status(200).json(product)

    }catch(err){res.status(500).json(err)}
    
});


//GET ALL PRODUCTS
router.get('/' ,async (req , res) => {

    const new_query = req.query.new;
    const category_query = req.query.category;
    try{
        
        let products;

        if(new_query){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(category_query){
            products = await Product.find({categories: {$in: [category_query]}})
        }else{
            products = await Product.find();
        }

        res.status(200).json(products)

    }catch(err){res.status(500).json(err)}
    
});

module.exports = router
