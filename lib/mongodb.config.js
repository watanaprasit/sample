require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=> {
    console.log("--mongoDB connected--")
}).catch(err => {
    console.log(err)
})

module.exports = mongoose