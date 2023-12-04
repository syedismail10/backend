import  express from "express";

const ImportData = express.Router()

ImportData.post('/user', async(req,res)=>{
    await User.remove({})
    const importUser = await User.insertMany(users)
    res.send({ importUser})
})

export default ImportData;
