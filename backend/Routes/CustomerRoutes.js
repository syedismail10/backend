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
CustomerRoute.get('/readCustomers', (req, res) => {
    const sql = 'SELECT * FROM customer'; // Assuming your table is named 'customer'

    db.query(sql, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No customers found' });
        }

        res.json(results);
    });
});

// reading single customer data
CustomerRoute.get('/readCustomer', (req, res) => {
    const customerId = req.query.id;

    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    const sql = 'SELECT * FROM customer WHERE customer_id = ?'; // Replace 'customer_id' with your actual column name for the customer ID

    db.query(sql, [customerId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json(results[0]);
    });
});

CustomerRoute.put('/updateCustomer/:id', async (req, res) => {
    //const customerId = req.query.id;
    const { email, name, ph_num } = req.body; // Replace with actual fields of your customer table

    // if (!customerId) {
    //     return res.status(400).json({ error: 'Customer ID is required' });
    // }

    const query = 'UPDATE customer SET email = ?, name = ?, ph_num= ?'

    db.query(query, [email, name, ph_num], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json({ message: 'Customer updated successfully' });
    });
});


//tested 
CustomerRoute.delete('/deleteCustomer/:id', (req, res) => {
    const customerId = req.params.id;

    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required' });
    }

    const sql = 'DELETE FROM customer WHERE customer_id = ?'; // Replace 'customer_id' with your actual column name for the customer ID

    db.query(sql, [customerId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found or already deleted' });
        }

        res.json({ message: 'Customer deleted successfully' });
    });
});


export default CustomerRoute
