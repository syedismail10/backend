import express from 'express'
//import asyncHandler from 'express-async-handler'
import db from '../db/dbConnection.js';
const discRoute =express.Router()

// Create Discount
discRoute.post('/createdisc', async (req, res) => {
    const { discount_id,active, name, percent } = req.body;
  
    const query = 'INSERT INTO discount (discount_id,active, name, percent) VALUES (?, ?, ?,?)';
  
    db.query(query, [discount_id,active, name, percent], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.status(201).json({ message: 'Discount created successfully', discount_id: results.insertId });
    });
  });
  //read
  discRoute.get('/readdisc', async (req, res) => {
    const discountId = req.query.id;
  
    const query = 'SELECT * FROM discount WHERE discount_id = ?';
  
    db.query(query, [discountId], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Discount not found' });
      }
  
      res.json({ discount: results[0] });
    });
  });
  
  // Update Discount by ID
  discRoute.put('/updatedisc', async (req, res) => {
    const discountId = req.query.id;
    const { active, name, percent } = req.body;
  
    const query = 'UPDATE discount SET active = ?, name = ?, percent = ? WHERE discount_id = ?';
  
    db.query(query, [active, name, percent, discountId], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Discount not found' });
      }
  
      res.json({ message: 'Discount updated successfully' });
    });
  });
  
  // Delete Discount by ID
  discRoute.delete('/disc_del', async (req, res) => {
    const discountId = req.query.id;
  
    const query = 'DELETE FROM discount WHERE discount_id = ?';
  
    db.query(query, [discountId], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Discount not found' });
      }
  
      res.json({ message: 'Discount deleted successfully' });
    });
  });
  export default discRoute