const mongoose = require('mongoose')
const env = require('dotenv')
env.config()

mongoose.connect(process.env.mongoDBURL)
        .then(()=> console.log("dB is connected"))
        .catch(error => console.log(error))

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User',userSchema)

const Account = mongoose.model('Account', accountSchema);


module.exports={ User, Account}
