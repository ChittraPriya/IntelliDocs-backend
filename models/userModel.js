const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type:String, required: true},
    email : {type:String, unique:true, required: true},
    password : {type:String, required: true},
    avatar: {type: String, default: ""},
        role: {
        type:String,
        enum: ["user","admin"],
        default: "user"
    },
    documents:[{ type:mongoose.Schema.Types.ObjectId, ref: "Document"}],
    sharedDocument: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document"}],
    isOnline: { type: Boolean, default:false},
    lastSeen: {type:Date},
    bio: {type:String},
    phone: {type:String},
    notifications: [{
        message: String, 
        read:{type:Boolean,default: false},
        createAt: {type:Date, default: Date.now} }]


},{timestamps: true})

module.exports = mongoose.model('User', userSchema , "users")