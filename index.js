const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("CONNECTED TO MONGO"))
    .catch(err => console.error("MONGO CONNECTION ERROR:", err));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);

app.listen(3000,()=>{
    console.log("BACKEND SEVER IS RUNNING");
});