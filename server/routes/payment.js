const router = require("express").Router();
const moment = require("moment");

const SHIPMENT = {
    normal : {
        price : 50,
        days: 7
    },
    fast: {
        price: 100,
        days: 3
    }
};

function shipmentPrice(shipmentOption) {
    let estimated = moment().add(shipmentOption.days, 'days').format("dddd MMMM do");

    return {
        estimated,
        price: shipmentOption.price
    };
}

router.post("/shipment", (req,res)=> {
    let shipment;
    if(req.body.shipment === "normal"){
        shipment = shipmentPrice(SHIPMENT.normal);
    } else {
        shipment = shipmentPrice(SHIPMENT.fast);
    }

    res.json({
        success: true,
        shipment: shipment,
    })
});


module.exports = router;