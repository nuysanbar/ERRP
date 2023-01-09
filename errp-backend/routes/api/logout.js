const express=require('express');
const router=express.Router();
const logoutController = require('../../controllers/logoutController.js');

router.route('/')
    .get(logoutController.handleLogout)
module.exports=router;