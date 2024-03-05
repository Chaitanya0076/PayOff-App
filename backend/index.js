const express = require('express')
const env = require('dotenv')
env.config()
const cors = require('cors')
const rootRouter = require('./routes/index')
const { User } = require('./db')
const { authMiddleware } = require('./middleware')
const jwt = require('jsonwebtoken')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hi all")
})

app.get('/conf',authMiddleware,async(req,res)=>{
    const id = req.query.id;
    try {
        await User.findOne({_id:id})
              .then((response)=>{
                return res.json(response)
              })
        
    } catch (error) {
        return res.send(error)
    }
    
} )

app.get('/me',async(req,res)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg:"Invalid token or the token doesnot start with Bearer "});
    }

    const token = authHeader.split(' ')[1];
    try {
        let decoded = jwt.verify(token,process.env.secret)
        if(decoded.userId){
            let  userId = decoded.userId
            await User.findOne({_id:userId})
                      .then((response)=>{
                        return res.json({
                            userId:response._id,
                            name:response.firstname
                        })
                      })
                      
        }
        
    } catch (error) {
        return res.send(error)
    }
})

app.use("/api/v1", rootRouter);


app.listen(3000,()=>console.log("Server is running at port 3000"))