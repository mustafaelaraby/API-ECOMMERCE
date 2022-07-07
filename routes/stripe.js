const router = require('express').Router();
const stripe = require('stripe')("sk_test_51KypmlHHob1nlaplQL07UQmVcd0DW2HCiySypC0etWAnDNZ3rhjnai1o22bY2ySpBhzTqGViZjcfw8cXQMooi0lj00d6lfyA6J");

router.post('/payment' , async(req , res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency:"usd"
        },
        (stripeErr , stripeRes) => {
            if(stripeErr){
                res.status(500).json(stripeErr);
            }else{
                res.status(200).json(stripeRes)
            }
        }
    )
})



module.exports = router