const Router = require("express").Router();
const authMiddleware = require("../../middleware/auth");
const Item = require("../../models/Item");

Router.post("/items/:householdId", authMiddleware, async(req, res)=>{
    try{
        const {name, category, quantity, expiryDate, status} = req.body;
        const {householdId} = req.params;
        const userId = req.user;
        console.log(userId.id);
        
        await Item.create({
            addedBy: userId.id,
            householdId: householdId,
            name,
            category,
            quantity,
            expiryDate,
            status
        })
        res.send({
            message: "item added successfully!"
        })

    }catch(e){
        res.status(500).json({
            message: `${e.message}`
        })
    }
})


Router.get("/items/:householdId", async(req, res)=>{
    try{
        const {householdId} = req.params; 
        const { category, status} = req.query;
        const filter = {};
        if(category) filter.category = category;
        if(status) filter.status = status;
        const items = await Item.find({
           householdId,
           ...filter,
        });
        res.json({
            items: [...items]
        })

    }catch(e){
        res.status(500).json({
            message: "Error occured!"
        })
    }
})


Router.put("/items/:householdId/:itemId", authMiddleware, async(req, res)=>{
    try{
        const {name, category, quantity, expiryDate, status} = req.body;
        const {householdId, itemId} = req.params;
        const userId = req.user;
        // console.log(userId.id);
        
        const item = await Item.findOneAndUpdate({_id: itemId, householdId}, {$set: {
            addedBy: userId.id,
            householdId: householdId,
            name,
            category,
            quantity,
            expiryDate,
            status
        }})

        if(!item){
            return res.status(404).json({
                message: "No item found!"
            })}
        res.send({
            message: "item updated successfully!"
        })

    }catch(e){
        res.status(500).json({
            message: `${e.message}`
        })
    }
})


Router.delete("/items/:id", authMiddleware, async(req, res)=>{
    try{
        const {id} = req.params;

        await Item.deleteOne({_id: id});

        res.send({
            message: "Item deleted successfuly!"
        })


    }catch(e){
        res.status(e).json({
            message : `${e.message}`
        })
    }
})

module.exports = Router;