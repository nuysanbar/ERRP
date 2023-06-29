const express = require('express');
const router=express.Router();
const adminController2 = require('../../controllers/adminController2.js');
const verifyAdmin=(req,res,next)=>{
  if(!req?.roles) return res.sendStatus(401)
  if(!(req.roles===3030)){
      return res.sendStatus(401)
  }
  next()
}
router.route("/retailers/:id")
    .get(verifyAdmin,adminController2.getRetailer);
router.route("/retailers/:id/products")
    .get(verifyAdmin,adminController2.getRetailerProducts)
router.route("/products/:id")
    .get(verifyAdmin,adminController2.getProduct);
router.route("/products/:id/retailers")
    .get(verifyAdmin,adminController2.getProductRetailers)
router.route("/orders")
    .get(verifyAdmin,adminController2.getOrders);
router.route("/orders/:id")
    .get(verifyAdmin,adminController2.getSingleOrder);
router.route("/deliverers/:id")
    .get(verifyAdmin,adminController2.getDeliverer)
module.exports=router;