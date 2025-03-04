const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("hey welcome to auth")
})

module.exports = router