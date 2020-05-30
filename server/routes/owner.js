const router = require("express").Router();
const Owner = require("../models/owner");

const upload = require("../middlewares/upload-photo");

// POST method
// title: String,
//     about: String,
//     photo: String
router.post("/owners", upload.single("photo") ,async (req,res) => {
   try {
    let owner = new Owner();
    owner.title = req.body.title;
    owner.about = req.body.about;
    owner.photo = req.file.location;

    await owner.save();
    res.json({
        status: true,
        message: "owner profile is created"
    });
   } catch(err){
       res.status(500).json({
           status: false,
           message: err.message
       });
   }

});


//GET request
router.get("/owners", async (req,res) => {
    try{
        let owners = await Owner.find();
        res.json({
            status: true,
            owners: owners
        });
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        }); 
    }
});

module.exports = router;