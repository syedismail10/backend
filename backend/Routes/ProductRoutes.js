import express from 'express'
import asyncHandler from 'express-async-handler'
import db from '../backend/db/createConnection.js'

const productRoute =express.Router()

// all products

productRoute.get("/",async(req,res)=> {
    const sql = "SELECT * FROM product";
    db.query(sql,(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);
        
    }) 
})

// singleproduct
productRoute.get("/:id", async(req,res)=> {
    const sql = "SELECT * FROM `product` WHERE `product_id` = ?";
    db.query(sql,[req.params.id],(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);
        
    }) 
})

// insert product can be done by admin
productRoute.post('/createProduct', async(req, res) => {
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



export default productRoute