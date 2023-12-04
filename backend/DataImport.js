import  express from "express";

const ImportData = express.Router()

ImportData.post('/user', async(req,res)=>{
    await User.Remove({})
    const ImportUser = await User.insertMany(users)
})
