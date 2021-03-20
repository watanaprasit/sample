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


//target the specific foodlist id instead of using the restaurant id itself
router.put("/:id/edit", async(req,res)=> {
    try{
        await Owner.findOneAndUpdate({"foodlist._id": req.params.id}, {
            $set: {
                "foodlist.$.name": req.body.name,
                "foodlist.$.description": req.body.description,
                "foodlist.$.price": req.body.price,
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
