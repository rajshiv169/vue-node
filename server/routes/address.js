const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");

    // user: {type: Schema.Types.ObjectId, ref: "User"},
    // country: String,
    // fullName: String,
    // streetAddress: String,
    // city: String,
    // state: String,
    // pinCode: Number,
    // phoneNumber: String,
    // deliveryInstructions: String,
    // securityCode: String


// POST Methods
router.post("/addresses", verifyToken, async (req,res) => {
    try {
        let address = new Address();
        address.user = req.decoded._id;
        address.country = req.body.country;
        address.fullName = req.body.fullName;
        address.streetAddress = req.body.streetAddress;
        address.city = req.body.city;
        address.state = req.body.state;
        address.pinCode = req.body.pinCode;
        address.phoneNumber = req.body.phoneNumber;
        address.deliveryInstructions = req.body.deliveryInstructions;
        address.securityCode = req.body.securityCode;

        await address.save();

        res.json({
            success: true,
            message: "Address added successfully"
        });
         
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// GET Method
router.get("/addresses", verifyToken ,async(req,res) => {
    try{
        let addresses = await Address.find({ user:req.decoded._id });

        res.json({
            success: true,
            addresses: addresses
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// GET Method single address
router.get("/addresses/:id", verifyToken ,async(req,res) => {
    try{
        let address = await Address.findOne({ _id :req.params.id });

        res.json({
            success: true,
            address: address
        });
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Get method for countries 
router.get("/countries", async (req,res) => {
    try {
        let response = await axios.get("https://restcountries.eu/rest/v2/all");

        res.json(response.data);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//PUT Method
router.put("/addresses/:id", verifyToken, async(req,res) => {
    try{
        let foundAddress = await Address.findOne({ _id: req.params.id });

        if(foundAddress){
            if(req.body.country) foundAddress.country = req.body.country;
            if(req.body.fullName) foundAddress.fullName = req.body.fullName;
            if(req.body.streetAddress) foundAddress.streetAddress = req.body.streetAddress;
            if(req.body.city) foundAddress.city = req.body.city;
            if(req.body.state) foundAddress.state = req.body.state;
            if(req.body.pinCode) foundAddress.pinCode = req.body.pinCode;
            if(req.body.phoneNumber) foundAddress.phoneNumber = req.body.phoneNumber;
            if(req.body.deliveryInstructions) foundAddress.deliveryInstructions = req.body.deliveryInstructions;
            if(req.body.securityCode) foundAddress.securityCode = req.body.securityCode;

            await foundAddress.save();

            res.json({
                success: true,
                message: "Successfully updated address"
            });
        }
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// DELETE Method

router.delete("/addresses/:id", verifyToken, async(req,res) => {
    try {
        let deletedAddress = await Address.remove({ user: req.decoded._id, _id: req.params.id });

        if(deletedAddress){
            res.json({
                success: true,
                message: "Address has been deleted"
            });
        }
    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


// PUT method to set default address
router.put("/addresses/set/default", verifyToken, async(req,res) => {
    try {
        const doc = await User.findOneAndUpdate({ _id: req.decoded._id }, {$set : { address: req.body.id } });

        res.json({ 
            success: true,
            message: "Successfully set this address as default"
        });

    } catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;