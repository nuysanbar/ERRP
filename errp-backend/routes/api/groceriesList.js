const express=require('express');
const router=express.Router();
const groceriesController = require('../../controllers/groceriesController')
router.route('/')
    .post(groceriesController.handleNewGrocery)
    .get(groceriesController.getGroceries)
router.route('/:id')
    .patch(groceriesController.handleCheck)
    .delete(groceriesController.deleteGrocery)
module.exports=router;