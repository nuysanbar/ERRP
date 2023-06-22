const express = require('express');
const router=express.Router();
const deliveryController = require('../../controllers/deliveryController.js');

router.route("/getOrders")
    .get(deliveryController.getOrders);
router.route("/getUser/:username")
    .get(deliveryController.getSelections);
router.route("/getOrderDetail")
    .get(deliveryController.getOrderDetail)
module.exports=router;