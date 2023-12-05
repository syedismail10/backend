import express from 'express'
//import asyncHandler from 'express-async-handler'
import db from '../db/dbConnection.js';

const CustomerRoute =express.Router()

CustomerRoute.post('/register', async (req, res) => {
    try {
        const { amt_spend, customer_id, email, name, password, ph_num } = req.body;
        const sql = 'INSERT INTO customer (amt_spend, customer_id, email, name, password, ph_num) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [
            req.body.amt_spend,
            req.body.customer_id,
            req.body.email,
            req.body.name,
            req.body.password,
            req.body.ph_num,
    
        ]
        const result = await db.query(sql, [amt_spend, customer_id, email, name, password, ph_num]);
        res.status(201).json({ message: 'Customer product added successfully', customerId: result.insertId });
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

CustomerRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // It's critical to hash passwords – never store or compare plain-text passwords
        // Here, you would hash the provided password and compare it to the hashed password in the database
        // For demonstration, the plain-text password is used directly (which is insecure)
        const sql = 'SELECT * FROM customer WHERE email = ? AND password = ?';
        const values = [email, password];

        const [result] = await db.query(sql, values);
        
        if (result.length > 0) {
            console.log(result);
            // You might want to exclude the password when sending back the user info
            const { password, ...customerInfo } = result[0];
            res.json(customerInfo);
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
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
