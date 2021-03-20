const router = require('express').Router()
const User = require('../model/user.model')
const passport = require('../lib/passportConfig')
const Owner = require('../model/owner.model')

router.get("/userinfo", passport.authenticate('jwt', { session: false }), async(req,res) => {
    try{
        let user = await User.findById(req.user.id)
        res.status(200).json({user})

    }catch(e){
        res.status(400).json({message:"something wrong"})
    }
})

router.get("/homepage", async(req,res) => {
    try{
        let restaurants = await Owner.find()
        res.status(200).json({restaurants})

    }catch(e){
        res.status(400).json({message:"something wrong"})
    }
})


router.get("/restaurant/:id", async(req,res) => {
    try{
        let restaurant = await Owner.findById(req.params.id)
        res.status(200).json({restaurant})
    }catch(e){
        res.status(400).json({message:"something wrong"})
    }
})





module.exports = router