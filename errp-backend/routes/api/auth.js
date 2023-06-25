const express = require('express');
const router=express.Router();
const authController = require('../../controllers/authController');
const forgotPasswordController = require('../../controllers/forgotPasswordController');
router.route("/")
    .post(authController.handleAuth);
router.route("/forgotPassword")
    .post(forgotPasswordController.handleforgot);
router.route("/resetPassword")
    .post(forgotPasswordController.handleReset);
module.exports=router;
