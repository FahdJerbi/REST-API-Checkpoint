const mongoose = require('mongoose')
const Schema = mongoose.Schema


// creating a User schema 
const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    isUser: {type: Boolean , default: true},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true})


// creating and exporting the model 
module.exports = mongoose.model('User',UserSchema )
