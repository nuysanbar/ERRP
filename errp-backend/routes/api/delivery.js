const express = require('express');
const router=express.Router();
const deliveryController = require('../../controllers/deliveryController.js');
const multer=require('multer')
var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('calling destination...')
      cb(null, './public/uploads/delivery')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, Date.now()+file.originalname)
    }
  })

var upload2= multer({ storage: storage2})
router.route("/getOrders")
    .get(deliveryController.getOrders);
router.route("/getSelections")
    .get(deliveryController.getSelections);
router.route("/getHistory")
    .get(deliveryController.getHistory);
router.route("/getOrderDetail/:id")
    .get(deliveryController.getOrderDetail)
router.route("/sendProve/:id")
    .post(upload2.single("proveImg"),deliveryController.sendProve)
router.route("/letMeShip/")
    .post(deliveryController.letMeShip)
module.exports=router;