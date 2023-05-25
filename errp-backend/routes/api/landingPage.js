const express=require('express');
const router=express.Router();
const LandingPageController=require('../../controllers/LandingPageController')

router.route('/:username')
    .get(LandingPageController.getUser)
router.route('/merchantSecret/:username')
    .get(LandingPageController.getMerchantSecret)
router.route('/:username/favorite')
    .get(LandingPageController.favorite)
router.route('/:username/products')
    .get(LandingPageController.getProducts)
router.route('/:username/:barcode')
    .get(LandingPageController.getProduct)
router.route('/:username/:barcode/review')
    .post(LandingPageController.review)
router.route('/:username/:barcode/save')
    .post(LandingPageController.save)
module.exports=router;


