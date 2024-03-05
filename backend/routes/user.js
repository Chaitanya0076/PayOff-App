const express = require('express')
const {userSignIn, userSignUp, updateBody} = require('../types')
const {User, Account} = require('../db')
const jwt = require('jsonwebtoken')
const {authMiddleware} = require('../middleware')
const env = require('dotenv')
env.config()

const router = express.Router();

router.put('/',authMiddleware,async(req,res)=>{
    const details = updateBody.safeParse(req.body)
    if (!details.success) {
        return res.status(411).json({
            message: "The fields should be of specified length"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully",
        name:req.body.firstname
    })
})

router.get("/bulk", authMiddleware,async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter,
                $options: 'i'
            }
        }, {
            lastname: {
                "$regex": filter,
                $options: 'i'
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

router.post('/signup',async(req,res)=>{
    const body = req.body
    const details = userSignUp.safeParse(body)

    if(!details.success){
        if(details.error.issues[0].validation == "email"){ 
            return res.json({
                msg:"Username should of type mail",
                error:details.error.issues[0]
           })
        }
        return res.send(details.error.issues[0])
    }else{
        const userexists = await User.findOne({username:body.username})
        if(userexists){
            return res.status(411).json({msg: "Email has already taken"})
        }
    }
    const user = await User.create({
        username:body.username,
        password:body.password,
        firstname:body.firstname,
        lastname:body.lastname
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: Math.floor(Math.random()*1000000)
    })

    const token = jwt.sign({userId},process.env.secret)
    res.status(200).json({
        msg:"User Created successfully",
        userId:userId,
        name:body.firstname,
        token:token
    })

})
router.post('/signin',async(req,res)=>{
    const body = req.body
    const head = req.headers.authorization
    const details = userSignIn.safeParse(body)

    if(!details.success){
        if(details.error.issues[0].validation == "email"){ 
            return res.json({
                msg:"Username should of type mail",
                error:details.error.issues[0]
           })
        }
        return res.send(details.error.issues[0])
    }else{
        const userexists = await User.findOne({username:body.username,password:body.password})
        if(userexists){
            if(head){
                const s=head.split(' ')[1];
            try {
                let decoded = jwt.verify(s,process.env.secret)
                console.log(decoded.userId)
                console.log("id:"+userexists._id)
                if(decoded.userId == userexists._id){
                    console.log("Hi there")
                    return res.status(200).json({msg:"User signed In successfully",token:s,userId:userexists._id,name:userexists.firstname})
                }else{
                    const token = jwt.sign({userId:userexists._id},process.env.secret)
                    return res.status(200).json({
                        name:userexists.firstname,
                        msg:"User logged In successfully",
                        userId:userexists._id,
                        token:token
                    })
                }
            } catch (error) {
                console.log(error)
            }
            }
            const jwtToken = jwt.sign({userId:userexists._id},process.env.secret)
                    return res.status(200).json({
                        name:userexists.firstname,
                        msg:"User logged In successfully",
                        userId:userexists._id,
                        token:jwtToken
                    })
        }
    }

    res.status(411).send("Invalid credentials")
    
})

module.exports = router;