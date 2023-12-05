import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import asyncHandler from 'express-async-handler'
import productRoute from './Routes/ProductRoutes.js'
import customerRoute from './Routes/customerRoutes.js'
import orderRoute from './Routes/OrderRoutes.js'
import discRoute from './Routes/DiscountRoutes.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 1000;

app.use(cors());

app.use(express.json())

const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store"
})

// APIs we use 

app.use('/api/products',productRoute)

app.use('/api/customer',customerRoute)

app.use('/api/order',orderRoute)

app.use('/api/discount',discRoute)

// api to get user order with order id
app.get("/user/:orderid",asyncHandler( async (req,res)=> {
    const sql = 'SELECT o.order_id, o.amount,o.customer_id FROM order_details o JOIN customer c ON o.customer_id = c.customer_id WHERE c.customer_id = ?';
    db.query(sql,[req.params.orderid],(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);    
    })
    }
))

app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
})