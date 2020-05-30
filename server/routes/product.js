const router = require("express").Router();
const Product = require("../models/product");


const upload = require("../middlewares/upload-photo");

// POST request - to create a product
// title: String,
//     description: String,
//     photo: String,
//     price: Number,
//     stockQuantity: Number,

router.post("/products", upload.single("photo"), async (req, res) => {
    try{
        let product = new Product();
        product.categoryID = req.body.categoryID;
        product.ownerID = req.body.ownerID;
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.price = req.body.price;
        product.stockQuantity = req.body.stockQuantity;

        await product.save(); // async

        res.json ({
            status: true,
            message: "Product is added successfully"
        });
    }
    catch(err){
        res.status(500).json ({
            status: false,
            message: err.message
        });
    }
});

// GET request - to get all product list
router.get("/products", async (req,res) => {
    try {
        let products = await Product.find().populate('owner').populate('category').exec();
        res.json({
            status: true,
            products: products
        });

    } catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});


// GET request - to get a single product details
router.get("/product/:id", async (req,res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });
        res.json({
            status: true,
            product: product
        });

    } catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});


// PUT request - to update a single product
router.put("/product/:id", upload.single("photo") ,async (req,res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { 
                $set: {
                    title : req.body.title,
                    description : req.body.description,
                    photo : req.file.location,
                    price : req.body.price,
                    stockQuantity : req.body.stockQuantity,
                    owner: req.body.ownerID,
                    category: req.body.categoryID
                }
            },
            {upsert: true}
            );
        res.json({
            status: true,
            updateProduct: product
        });

    } catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});


// DELETE request - to delete a single product 
router.delete("/product/:id", async (req,res) => {
    try{
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

        if(deletedProduct){
            res.json({
                status: true,
                message: "Succussfully deleted"
            });
        } else {
            res.json({
                status: false,
                message: "product is not available"
            });
        }
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});



module.exports = router;    