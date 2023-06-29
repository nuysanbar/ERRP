const express = require('express');
const router=express.Router();
const multer=require('multer')
const adminController2 = require('../../controllers/adminController2.js');
const verifyAdmin=(req,res,next)=>{
  if(!req?.roles) return res.sendStatus(401)
  if(!(req.roles===3030)){
      return res.sendStatus(401)
  }
  next()
}

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('calling destination...')
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      console.log(file.originalname)
      cb(null, Date.now()+file.originalname)
    }
  })

var upload2= multer({ storage: storage2})
router.route("/dashbaord")
    .get(verifyAdmin,adminController2.dashboardData)
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
router.route("/pendingProducts")
    .get(verifyAdmin,adminController2.getPendingProducts)
router.route("/pendingProducts/:id")
    .get(verifyAdmin,adminController2.getPendingProduct);
router.route("/handleRemove/:id")
    .delete(verifyAdmin,adminController2.handleRemove)
router.route("/handleApprove/:id")
    .get(verifyAdmin,adminController2.handleApprove)
router.route("/update/:id")
    .post(verifyAdmin,upload2.single("profileImg"),adminController2.handleProfileUpdate)
module.exports=router;