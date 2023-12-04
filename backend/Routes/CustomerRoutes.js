import express from 'express'
//import asyncHandler from 'express-async-handler'
import db from '../db/dbConnection.js';


const CustomerRoute =express.Router()

CustomerRoute.post('/register', async (req, res) => {
    try {
        const sql = 'INSERT INTO customer (name, email,ph_num,amt_spend,password,address, city) VALUES (?, ?, ?, ?,?,?,?)';
        const values = [
            req.body.amt_spend,
            req.body.customer_id,
            req.body.email,
            req.body.name,
            req.body.password,
            req.body.ph_num,
            amt_spend,
            
        ]
        const result = await db.query(sql, [values]);
        res.status(201).json({ message: 'Customer registered added successfully', customerId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//reading all customers data
CustomerRoute.get('/readCustomers', async (req, res) => {
    try {
        const sql = 'SELECT * FROM customer';
        const results = await db.query(sql);
        console.log(results); // Add this line to check the structure of results
        res.json(results[0]); // Assuming the query results are in the first element
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// reading single customer data
CustomerRoute.get('/readCustomer', async (req, res) => {
    try {
        const sql = 'SELECT * FROM customer WHERE customer_id = ?';
        const result = await db.query(sql, [req.params.id]);
        console.log(result);
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


CustomerRoute.put('/update', async (req, res) => {
    try {
        const { amt_spend, email, name, password, ph_num } = req.body;
        const sql = 'UPDATE customer_product SET amt_spend = ?, email = ?, name = ?, password = ?, ph_num = ? WHERE customer_id = ?';
        
        await db.query(sql, [amt_spend, email, name, password, ph_num, req.params.id]);
        res.json({ message: 'Customer product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

CustomerRoute.delete('/deleteCustomer', async (req, res) => {
    try {
        const sql = 'DELETE FROM customer WHERE customer_id = ?';
        await db.query(sql, [req.params.id]);
        res.json({ message: 'Customer product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







export default CustomerRoute
