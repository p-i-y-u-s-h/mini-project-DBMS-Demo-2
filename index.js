const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("CONNECTED TO MONGO"))
    .catch(err => console.error("MONGO CONNECTION ERROR:", err));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/",(req,res)=>{
    res.send("welcome")
});

app.get("/users",(req,res)=>{
    res.send("welcome user")
})


app.listen(3000,()=>{
    console.log("BACKEND SEVER IS RUNNING");
});