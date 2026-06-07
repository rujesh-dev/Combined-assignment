const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post("/signup", async(req, res)=>{
  try{
      const {name, email, password} = req.body;
    // console.log(name, email, password);

    // res.send(name+ email+  password)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    

 res.send("You have signup successfully!")
  }catch (e) {

//   console.error(e.message);
  res.status(500).json({
    message: `${e.message}`
  });
}

    
})


router.post("/login", async(req, res)=>{
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({
            email
        }) 
        if(!user){
            return res.status(401).send("Invalid creds!")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(401).send("Invalid creds!")
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

            res.setHeader("token", token);
            // console.log(response.headers.token);
            // res.send(user._id);
            res.send(token);
        

    }catch(e){
        res.status(500).send({
            message: `${e.message}`
        });
    }
})


module.exports = router;