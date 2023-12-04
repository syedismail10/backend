import express from 'express'
import db from '../db/dbConnection.js'

const productRoute =express.Router()
productRoute.use(express.json())

// all products tested

productRoute.get("/",async(req,res)=> {
    const sql = "SELECT * FROM product";
    db.query(sql,(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);
        
    }) 
})

// singleproduct tested
productRoute.get("/product", async(req,res)=> {
    const sql = "SELECT * FROM `product` WHERE `product_id` = ?";
    db.query(sql,[req.query.id],(err,data) =>{
        if(err) 
            return res.json("Error");
        return res.json(data);
        
    }) 
})

// insert product can be done by admin tested
productRoute.post('/', async(req, res) => {
    const sql = "INSERT INTO product (`product_id`, `name`, `description`, `discount_id`, `quantity`, `category_id`, `price`) VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.product_id,
        req.body.name,
        req.body.description,
        req.body.discount_id,
        req.body.quantity,
        req.body.category_id,
        req.body.price 
    ]
    new Promise((resolve, reject) => {
        db.query(sql, values, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    })
    .then(data => res.json({ message: "Product inserted successfully", data }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// update product details tested now
productRoute.put('/update', async(req, res) => {
    const product_id = req.query.product_id;
    const {name, description, discount_id, quantity, category_id, price } = req.body;
    const sql = 'UPDATE product SET name = ?, description = ?, discount_id = ?, quantity = ?, category_id = ?, price rsrs= ? WHERE product_id = ?';
    db.query(sql, [name, description,discount_id, quantity, category_id, price,product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product updated' });
    });
});

// delete product tested

productRoute.delete('/', async(req, res) => {
    const product_id = req.query.product_id
    const sql = 'DELETE FROM product WHERE product_id = ?';
    db.query(sql, [product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message:`${product_id} Product deleted` });
    });
});

export default productRoute