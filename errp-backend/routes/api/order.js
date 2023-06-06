// 'use strict';
const orderController = require('../../controllers/orderController');
const deliveryController = require('../../controllers/homeControllers/deliveryController');
const express = require('express');
const router=express.Router();
router.route("/acceptProduct")
  .put(deliveryController.accepted)
router.route("/refundProduct")
  .put(deliveryController.refund)
router.route('/CheckoutExpress')
  .post(orderController.CheckoutExpress);
router.route('/CheckoutCart')
  .post(orderController.CheckoutCart);
router.route('/IPNDestination')
  .post(orderController.IPNDestination);
router.route('/PaymentSuccessReturnUrl')
  .get(orderController.PaymentSuccessReturnUrl);
router.route('/PaymentCancelReturnUrl')
  .get(orderController.PaymentCancelReturnUrl);
module.exports=router;