const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    firstname : {type: String, required:true},
    lastname : {type: String, required:true},
    email : {type: String, required:true},
    password : {type: String, required:true},
    address :{
        unit : {type: String, required:true},
        streetname : {type: String, required:true},
        postalcode : {type: String, required:true}
    },
    isAdmin: {default: false, type: Boolean},
    foodcart :[{
        foodname : {type: String},
        foodprice : {type: Number},
        quantity : {type: String},
    }],

}, {
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)