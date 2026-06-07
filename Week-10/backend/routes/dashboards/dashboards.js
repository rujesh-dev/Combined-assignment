const Router = require('express').Router();
const {authMiddleware} = require("../../middleware/auth");

Router.get("/stats", authMiddleware, async(req, res)=>{
    try{
        

    }catch(e){
        res.status(401).send({
            message: `${e.message}`
        })
    }
})


module.exports = Router;