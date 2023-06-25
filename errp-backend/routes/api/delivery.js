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
const verifyDelivery=(req,res,next)=>{
    if(!req?.roles) return res.sendStatus(401)
    if(!(req.roles===3011)){
        return res.sendStatus(401)
    }
    next()
}
router.route("/getOrders")
    .get(verifyDelivery,deliveryController.getOrders);
router.route("/getSelections")
    .get(verifyDelivery,deliveryController.getSelections);
router.route("/getHistory")
    .get(verifyDelivery,deliveryController.getHistory);
router.route("/getOrderDetail/:id")
    .get(verifyDelivery,deliveryController.getOrderDetail)
router.route("/sendProve/:id")
    .post(verifyDelivery,upload2.single("proveImg"),deliveryController.sendProve)
router.route("/letMeShip/")
    .post(verifyDelivery,deliveryController.letMeShip)
module.exports=router;