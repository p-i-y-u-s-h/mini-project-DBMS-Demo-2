const router = require("express").Router();
const User = require("../models/user")

// router.get("/register",async(req,res)=>{
//     const user = await new User({
//         username:"john",
//         email:"john@gmail.com",
//         password:"123456"
//     })

//     await user.save();
//     res.send("oK")
// })

router.post("/register",async(req,res)=>{
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err){
        console.log(err);
    }
})

module.exports = router