const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=> {console.log('DATABASE CONNECTED SUCCESSFULLY!')})
.catch((err)=> {console.log(err)});

app.use('/api/users' ,userRoute);
app.use('/api/auth' , authRoute);
app.use('/api/products' , productRoute);
app.use('/api/carts' , cartRoute)
app.use('/api/orders' , orderRoute);
app.use('/api/checkout', stripeRoute);


app.listen(process.env.PORT || 5000 , () => {
    console.log(`BACK-END SERVER RUNNING ON PORT:     http://localhost:${process.env.PORT}`)
})