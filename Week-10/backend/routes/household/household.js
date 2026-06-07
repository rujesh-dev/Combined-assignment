const router = require("express").Router();
const authMiddleware = require("../../middleware/auth");
const Household = require("../../models/Household");

router.post("/createHousehold", authMiddleware, async(req, res)=>{
    try{
        const {name, inviteCode, members, wasteScore} = req.body;
        const uniqueId = crypto.randomUUID();
        
        await Household.create({
                inviteCode: uniqueId,
                name, 
                // inviteCode, 
                members, 
                wasteScore
        })
        

        res.json({
            message: "House hold created successfully",
            
        })
    }catch(e){
        res.status(411).json({
            message: "Something went wrong"
        })
    }
})



router.post("/join", authMiddleware, async(req, res)=>{
    try{
       
        const userId = req.user;
        
        const { inviteCode } = req.body;
        const householdFound = await Household.findOne({
            inviteCode
        })
        if(!householdFound){
           return res.status(402).json({
                message: "no such househodl found"
            })
        }

       await householdFound.members.push(userId.id);
       await householdFound.save();

       res.json({
        message: "You have joined the household successfully!"
       })

    }catch(e){
        res.status(402).json({
            message: `${e.message}`
        })
    }
})


router.post("/leave", authMiddleware, async(req, res)=>{
    try{
       
        const userId = req.user;
        
        const { inviteCode } = req.body;
        const householdFound = await Household.findOne({
            inviteCode
        })
        if(!householdFound){
           return res.status(402).json({
                message: "no such househodl found"
            })
        }

       await householdFound.members.pop(userId.id);
       await householdFound.save();

       res.json({
        message: "You have joined the household successfully!"
       })

    }catch(e){
        res.status(402).json({
            message: `${e.message}`
        })
    }
})


router.get("/me", authMiddleware, async(req, res)=>{
    try{
        const user = req.user;
        const isMember = await Household.findOne({
            members : user.id
        })

        if(!isMember){
            return res.status(402).json({
                message: "You are not member of eny housedhold"
            })
        }

        res.json({
            message:   `${isMember.name}`
        })
    }catch(e){
        res.status(411).json({
            message: `${e.message}`
        })
    }
})


router.get("/:id/members", authMiddleware, async(req, res)=>{
    try{
        const househodlId = req.params.id;
        const houseHodlFound = await Household.findOne({
            _id: househodlId
        })

        if(!houseHodlFound){
            return res.status(402).json({
                message: "No such household exist!"
            })
        }

        res.send(houseHodlFound.members);
    }catch(e){
        res.status(411).json({
            message: `${e.message}`
        })
    }
})











module.exports = router;