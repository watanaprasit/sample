const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ownerSchema = new Schema({
    firstname : {type: String, required:true},
    lastname : {type: String, required:true},
    email : {type: String, required:true},
    password : {type: String, required:true},
    address :{
        unit : {type: String},
        streetname : {type: String},
        postalcode : {type: String}
    },
        restaurantname : {type: String, required:true},
        restaurantaddress : {
            resunit : {type: String},
            resstreetname : {type: String},
            respostalcode : {type: String}
            },
        foodlist: [{
            name: {type: String},
            description: {type: String},
            price: {type: Number}
        }],
        foodimages: [{type: String}],
})



module.exports = mongoose.model("Owner", ownerSchema)