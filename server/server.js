const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const User = require("./models/user");

dotenv.config();

const app = express();

//Database connection
mongoose.connect ( process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    err => {
        if(err){
            console.log(err);
        } else {
            console.log("Connected to the database");
        } 
    }
);

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(function(req,res,next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });

//require apis
const ProductRoutes = require("./routes/product");
const CategoryRoutes = require("./routes/category");
const OwnerRoutes = require("./routes/owner");
const UserRoutes = require("./routes/auth");
const ReviewRoutes = require("./routes/review");
const AddressRoutes = require("./routes/address");

app.use("/api", ProductRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", OwnerRoutes);
app.use("/api", UserRoutes);
app.use("/api", ReviewRoutes);
app.use("/api", AddressRoutes);

app.listen(3000, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Listening on PORT", 3000);
    }
});