const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("hey welcome")
})

module.exports = router