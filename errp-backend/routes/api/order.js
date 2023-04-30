// 'use strict';
const orderController = require('../../controllers/orderController');
const express = require('express');
const router=express.Router();
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