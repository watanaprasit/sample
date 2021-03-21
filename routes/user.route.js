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

//routes for foodcart

router.get("/:id/foodcart", async(req,res) => {
    try{
        let user = await User.findById(req.params.id)
        res.status(200).json({user})

    }catch(e){
        res.status(400).json({message:"could not view foodcart"})
    }
})


router.post("/:id/foodcart/add", async(req,res)=> {
    try{
        let data = {
            foodname : req.body.foodname,
            foodprice: req.body.foodprice,
            quantity: req.body.quantity
        }
        await User.findByIdAndUpdate(req.params.id, {$push: {foodcart:data}})
        return res.status(200).json({message: "added to foodcart"})
    }catch(e){
        res.status(400).json({message:"could not add to foodcart"})
    }
})

router.delete("/:id/foodcart/:foodcartid/delete", async(req,res)=> {
        try{
            await User.findByIdAndUpdate(req.params.id, {
                $pull: {
                    foodcart : {_id : req.params.foodcartid }
                }
            }, {new: true})

            return res.status(200).json({message: "deleted from foodcart"})
        }catch(e){
            res.status(400).json({message:"could not delete from foodcart"})
        }
})

router.put("/:foodcartid/edit", async(req,res)=> {
    try{
        await Owner.findOneAndUpdate({"foodcart._id": req.params.foodcartid}, {
            $set: {
                "foodcart.$.quantity": req.body.quantity,
            }
        })

        return res.status(200).json({message: "food item quantity updated"})
    }catch(e){
        res.status(400).json({message:"cannot update quantity"})
    }
})

module.exports = router
