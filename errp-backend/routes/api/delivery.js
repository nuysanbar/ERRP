const express = require('express');
const router=express.Router();
const deliveryController = require('../../controllers/deliveryController.js');

router.route("/getOrders")
    .get(deliveryController.getOrders);
router.route("/getSelections")
    .get(deliveryController.getSelections);
router.route("/getHistory")
    .get(deliveryController.getHistory);
router.route("/getOrderDetail/:id")
    .get(deliveryController.getOrderDetail)
module.exports=router;