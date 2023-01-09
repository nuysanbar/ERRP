const express=require('express');
const router=express.Router();
const LandingPageController=require('../../controllers/LandingPageController')

router.route('/:username')
    .get(LandingPageController.getUser)
router.route('/:username/products')
    .get(LandingPageController.getProducts)
router.route('/:username/products/:barcode')
    .get(LandingPageController.getProduct)
router.route('/:username/products/:barcode/like')
    .post(LandingPageController.like)
router.route('/:username/products/:barcode/dislike')
    .post(LandingPageController.dislike)
router.route('/:username/products/:barcode/review')
    .post(LandingPageController.review)
router.route('/:username/products/:barcode/save')
    .post(LandingPageController.save)

module.exports=router;