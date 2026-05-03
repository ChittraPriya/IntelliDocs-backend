const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    title:{type:String},
    content: {type:String},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:'true'},
    collaborators: [{
        user: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
        role:{type:String, enum:["editor", "viewer"], default:"viewer"}
    }]
},{timestamps: true})

module.exports = mongoose.model('Document', documentSchema, "documents");