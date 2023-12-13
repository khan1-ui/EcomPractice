const express = require('express')
const router = express.Router()
const productCotroller = require('../controller/productController')
const userController = require('../controller/userController')


//Products Routing-Ending Point
router.get('/product-brand-list',productCotroller.productBrandList)
router.get('/product-category-list',productCotroller.producCategoryList)
router.get('/product-slider-list',productCotroller.productSliderList)
router.get('/product-list-by-brand/:brandId',productCotroller.productListByBrand)
router.get('/product-list-by-category/:categoryId',productCotroller.productListByCategory)
router.get('/product-list-by-similar/:categoryId',productCotroller.productListBySimilar)
router.get('/product-list-by-keyword/:keyword',productCotroller.productListByKeyword)
router.get('/product-list-by-remark/:remark',productCotroller.productListByRemark)
router.get('/product-details/:productId',productCotroller.productDetails)
router.get('/product-review/:productId',productCotroller.productListByReview)
//users 
router.get('/userOTP/:email',userController.userOTP)
router.get('/verifyLogin/:email/:otp',userController.verifyLogin)
router.post('/createUser',userController.creatUser)


module.exports = router