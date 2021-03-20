require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')
const {body, check, validationResult} = require('express-validator')

router.get("/users", async(req,res)=> {
    try{
        let users = await User.find()
        res.status(200).json({users})

    }catch(e){
        console.log(e)
        res.status(400).json({message: e || "something went wrong"})
    }
})

router.post("/signup",
    body('firstname').isLength({min:3}).withMessage("Invalid Name"),
    body('lastname').isLength({min:3}).withMessage("Invalid Name"),
    body('email').isEmail().withMessage("Not An Email"),
    body('password').isLength({min:6}).withMessage("Password must be more 6 alphanumeric"),
    // body("password").isStrongPassword({
    //     minLength: 8,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1
    // })
    //     .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    body('unit').isNumeric().withMessage("Must be number"),
    body('postalcode').isLength({min:6, max:6}).withMessage("Not a valid postal code"),
    async(req,res)=> {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        let {firstname, lastname, email, password, unit, streetname, postalcode} = req.body
        let hashedPassword = await bcrypt.hash(password, 10)
        let tempUser = {firstname, lastname, email, password: hashedPassword, address :{
            unit, streetname, postalcode
            }}

        let user = new User(tempUser)
        await user.save()

        let payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload,process.env.SECRET,{
            expiresIn : 1000000000000000000
        }, (err, token) => {
            res.status(200).json({
                message: "success in sign in",
                token
            })
        })

    } catch(e){

        res.status(400).json({message: "something went wrong"})
    }
})

router.post("/signin",
    check('email')
        .exists()
        .withMessage("EMAIL IS EMPTY")
        .isEmail()
        .withMessage("EMAIL_IS_IN_WRONG_FORMAT"),
    check('password')
        .exists()
        .withMessage("PASSWORD_IS_EMPTY")
        .isLength({ min: 6 })
        .withMessage("PASSWORD_LENGTH_MUST_BE_MORE_THAN_6"),
    async(req,res,next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        let {email, password} = req.body
        let user = await User.findOne({email})

        if(!user){
            throw "no user found"
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            throw "password does not match"
        }

        let payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload,process.env.SECRET,{
            expiresIn : 1000000000000000000
        }, (err, token) => {
            res.status(200).json({
                message: "success in sign in",
                token
            })
        })


    }catch(e){
        res.status(400).json({message: e || "something went wrong"})
    }
})

module.exports = router