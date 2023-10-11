const router = require('express').Router()
const User = require("../Modals/User")
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWTSECRET = "2522#KMSA"
const { verifyToken } = require("./verifytoken")
const Post = require('../Modals/Post')


// CREATE USER
router.post("/create/user", 
    body('email').isEmail(), 
    body('password').isLength({min:6}),
    body('username').isLength({min:5}),
    body('phonenumber').isLength({min:10}),
    async(req,res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json(error)
            // return res.status(400).json("Some error occured")
        }

        try {
            let user = await User.findOne({email:req.body.email})
            if(user){
                return res.status(200).json("Please login with correct password")
            } 

            const salt = await bcrypt.genSalt(10)
            const secpass = await bcrypt.hash(req.body.password, salt)
    
            user = await User.create({
                username:req.body.username,
                email:req.body.email,
                password:secpass,
                profile:req.body.profile,
                phonenumber:req.body.phonenumber
            })
            const accessToken = jwt.sign({
                id:user._id,
                username:user.username
            }, JWTSECRET)

            await user.save();
            res.status(200).json({user, accessToken});            
        } 
        catch (error) {
            return res.status(400).json("Internal error occured")
        }
    }
)


// LOGIN USER
router.post('/login', 
    body('email').isEmail(), 
    body('password').isLength({min:6}),
    async(req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            // return res.status(400).json(error)
            return res.status(400).json("Some error occured")
        } 

        try {
            const user = await User.findOne({email:req.body.email})
            if(!user){
                return res.status(400).json("User doesn't found")
            }
            
            const comparePassword = await bcrypt.compare(req.body.password , user.password)
            if(!comparePassword){
                return res.status(400).json("Password error")
            }
    
            const accessToken = jwt.sign({
                id:user._id,
                username:user.username
            }, JWTSECRET)

            const { password, ...other } = user._doc
    
            res.status(200).json({other, accessToken});
        }
        catch (error) {
            // res.status(500).json("Internal error occured")
            res.status(500).json(error)
        }

})

// FOLLOWING
router.put("/following/:id", verifyToken, async(req,res)=>{
    if(req.params.id !== req.body.user){
        const user = await User.findById(req.params.id)
        const otheruser = await User.findById(req.body.user)

        if(!user.Followers.includes(req.body.user)){
            await user.updateOne({$push: {Followers: req.body.user}})
            await otheruser.updateOne({$push: {Following: req.params.id}})
            return res.status(200).json("User has followed")
        }
        else{
            return res.status(400).json("You already follow this user")
        }
    }
    else{
        return res.status(400).json("You can't follow yourself")
    }
} )


// FETCH POST FROM FOLLOWING
router.get("/flw/:id", verifyToken, async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const followersPost = await Promise.all(
            user.Following.map((item) => {
                return Post.find({user:item})
            })
        )
        return res.status(200).json(followersPost)
    } catch (error) {
        return res.status(500).json(erro);
    }
})


// UPDATE USER PROFILE
router.put("/update/:id", verifyToken, async(req,res)=>{
    try {
        if (req.params.id === req.user.id) {
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                const secpass = await bcrypt.hash(req.body.password, salt);
                req.body.password = secpass
                const updateuser = await User.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                })
                await updateuser.save();
                res.status(200).json(updateuser);
            }
        } 
        else {
            return res.status(400).json("You are not allow to update this details.")    
        }
    } 
    catch (error) {
        return res.status(500).json("Internal Server error")    
    }
})



// DELETE USER ACCOUNT
router.delete("/delete/:id", verifyToken, async(req, res)=>{
    try {
        if(req.params.id !== req.user.id){
            return res.status(400).json("Account doesn't match")
        }    
        else{
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("User account has been deleted")
        }
    } 
    catch (error) {
        return res.status(500).json("Internal Server error")    
    }
})

// GET USER DETAILS FOR POST
router.get("/post/user/details/:id", async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json("User not found")
        }
        const { email, password, phonenumber, Followers, Following, ...others } = user._doc;
        return res.status(200).json(others);
    } catch (error) {
        // return res.status(500).json("Internal server error")
        console.log(others);
    }
})


module.exports = router;