import dotenv from 'dotenv'

dotenv.config()
const express = require("express")
const cors = require("cors");
const mysql = require("mysql")
const app = express()

const PORT = prcoess.env.PORT || 1000;

app.use(cors());

app.use(express.json())

const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store"
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

// all products

app.get("/api/products",(req,res)=> {
    const sql = "SELECT * FROM product";
    db.query(sql,(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);
        
    }) 
})

// singleproduct
app.get("/product/:id",(req,res)=> {
    id = 2
    const sql = "SELECT * FROM `product` WHERE `product_id` = ?";
    db.query(sql,[req.params.id],(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);
        
    }) 
})


app.post('/createProduct',(req, res) => {
    const sql = "INSERT INTO product (`product_id`, `name`, `description`, `discount_id`, `quantity`, `category_id`, `price`) VALUES (?)";
    const values = [
        req.product_id,
        req.body.name,
        req.body.description,
        req.body.discount_id,
        req.body.quantity,
        req.body.category_id,
        req.body.price 
    ]
    db.query(sql,[values],(err,data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })

})

