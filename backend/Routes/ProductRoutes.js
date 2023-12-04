import express from 'express'
import asyncHandler from 'express-async-handler'

const productRoute =express.Router()

productRoute.get('/proudcts', asyncHandler (
    async( ) => {
        const products = await Product.find({})
        res.json([products]);
    }
))

export default productRoute