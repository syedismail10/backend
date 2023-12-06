import express from 'express'
//import asyncHandler from 'express-async-handler'
import db from '../db/dbConnection.js';
const orderRoute =express.Router()

//create order //tested
orderRoute.post('/create', async (req, res) => {
    try {
      const { order_id, product_id, quantity } = req.body;
  
      // Insert order item into 'order_items' table
      db.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [order_id, product_id, quantity], (error, results) => {
        if (error) throw error;
  
        const order_item_id = results.insertId;
        return res.status(201).json({ message: 'Order item created successfully', order_item_id });
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Read Order Items by Order ID   not working //not tested
orderRoute.get('/readorder', async (req, res) => {
    const orderId = req.query.order_id;
  
    if (!orderId) {
      return res.status(400).json({ error: 'Missing order_id parameter' });
    }
  
    const query = `
      SELECT order_items.*
      FROM order_items
      JOIN order_details ON order_items.orderid = order_details.order_id
      WHERE order_details.order_id = ?;
    `;
  
    db.query(query, [orderId], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ order_items: results });
    });
  });
 // Update Order Item by ID //tested
 orderRoute.put('/updateorder', async (req, res) => {
    const orderItemId = req.query.order_id;
    const { quantity } = req.body.quantity;
  
    db.query('UPDATE order_items SET quantity = ? WHERE order_id = ?', [quantity, orderItemId], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Order item not found' });
      }
      res.json({ message: 'Order item updated successfully' });
    });
  }); 

  export default orderRoute
