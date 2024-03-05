const express = require('express')
const {authMiddleware} = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance',authMiddleware,async(req,res)=>{
     const account = await Account.findOne({userId: req.userId})

     res.status(200).json({balance: (account.balance)/100})
})

router.post("/transfer", authMiddleware, async (req, res) => {
    try{const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);
    // console.log("userId:"+req.userId,account.userId)
    // console.log("amount:"+amount*100, "account.balance:"+account.balance)
    if (!account || account.balance < (amount*100)) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance or the userId does not exists"
        });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid sender's account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount*100 } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount*100 } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        msg: "Transaction successful"
    });
   }catch(error){
    res.status(500).json({
        msg: "Internal server error transaction failed",
        error:error
    })
   }
});

module.exports = router;