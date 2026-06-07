const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth/auth");
const householdRouter = require("./routes/household/household")
const itemRouter = require("./routes/item/item")
require("dotenv").config();


const app = express();

mongoose.connect(process.env.MONGODB_CONNECTIONSTRING)
.then(()=>{console.log("Connected to DB...")})
.catch((err)=>{console.log(err.message)})


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/household", householdRouter);
app.use("/api/item", itemRouter);

app.listen(3000, ()=>{
    console.log('Server started!');
    
})