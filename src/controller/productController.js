const {brandListService,categoryListService,sliderListService,productListByBrandService,productListByCategoryService,productListByRemarkService,productListBySimilarService,productDetailService,productListByKeywordService,productReviewListService}=require('../services/productServices')
exports.productBrandList=async(req,res)=>{
let result = await brandListService()
return res.status(200).json(result)
}
exports.producCategoryList=async(req,res)=>{
    let result = await categoryListService()
    return res.status(200).json(result)
}
exports.productSliderList=async (req,res)=>{
    let result = await sliderListService()
    return res.status(200).json(result)
}


exports.productListByBrand= async(req,res)=>{
    let result = await productListByBrandService(req)
    return res.status(200).json(result)
}
exports.productListByCategory= async(req,res)=>{
let result = await productListByCategoryService(req)
return res.status(200).json(result)
}
exports.productListByRemark=async(req,res)=>{
    let result = await productListByRemarkService(req)
    return res.status(200).json(result)

}


exports.productListBySimilar=async(req,res)=>{
let result = await productListBySimilarService()
return res.status(200).json(result)
}
exports.productDetails=async(req,res)=>{
    let result = await productDetailService(req)
    return res.status(200).json(result)
    }



exports.productListByKeyword=async(req,res)=>{
    let result = await productListByKeywordService(req)
    return res.status(200).json(result)

}

exports.productListByReview=async(req,res)=>{
let result =await productReviewListService(req)
return res.status(200).json(result)
}


