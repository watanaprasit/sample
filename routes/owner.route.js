const router = require('express').Router()
const Owner = require('../model/owner.model')

router.get("/:id", async(req,res) => {
    try{
        let restaurant = await Owner.findById(req.params.id)
        res.status(200).json({restaurant})
    }catch(e){
        res.status(400).json({message:"something wrong"})
    }
})


router.post("/:id/add", async(req,res) => {
    try{
        let data = {
            name : req.body.name,
            description: req.body.description,
            price: req.body.price
        }
        await Owner.findByIdAndUpdate(req.params.id, {$push: {foodlist:data}})
        return res.status(200).json({message: "menu item created"})
    }catch(e){
        res.status(400).json({message:"menu item not created"})
    }
})


//it will instead edit the entire foodlist instead of one
router.put("/:id/edit", async(req,res)=> {
    try{
        // let target = await Owner.findById(req.params.id)
        // let index = await target.foodlist.findIndex(el => el._id == req.body._id)
        // let {name, description, price} = req.body
        // let res = await target.foodlist[index].replaceOne({name, description, price})
        await Owner.findOneAndUpdate({"_id": req.params.id}, {
            $set: {
                "restaurant.foodlist.$.name": req.body.name,
                "restaurant.foodlist.$.description": req.body.description,
                "restaurant.foodlist.$.price": req.body.price,
            }
        })

        return res.status(200).json({message: "menu item updated"})
    }catch(e){
        res.status(400).json({message:"cannot update menu item"})
    }
})


router.delete("/:id/delete", async(req,res) => {
    //how to get the foodID
    // const foodid = "6055d442c61b8911422fa2cb"
    //
    // try{
    //
    //     await Owner.findByIdAndUpdate(req.params.id, {
    //         $pull: {
    //             foodlist : {_id : `${foodid}`}
    //         }
    //     }, {new: true})
        try{
            await Owner.findOneAndDelete({"foodlist._id": req.params.id})


        return res.status(200).json({message: "menu item deleted"})

    }catch(e){
        res.status(400).json({message:"did not delete menu item"})
    }

})



module.exports = router
