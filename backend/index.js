const express = require("express")
const cors = require("cors");
const mysql = require("mysql")
const app = express()

app.use(cors());

app.use(express.json())

const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "store"
})

app.listen(8081, () => {
    console.log("listening");
})

app.get("/",(req,res)=> {
    const sql = "SELECT * FROM product";
    db.query(sql,(err,data) =>{
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

