const mongoose = require('mongoose')
const ObjectId= mongoose.Types.ObjectId
const BrandModel = require('../models/BrandModel')
const ProductCategoryModel = require('../models/CategoryModel')
const ProductSliderModel = require('../models/ProductSliderModel')
const ProductModel = require('../models/ProductModel')
const ProductDetailModel = require('../models/ProductDetailsModel')
const ReviewModel = require('../models/ReviewModel')

const brandListService =async()=>{
    try {
        let data =await BrandModel.find()
        return {satatus:"success",data:data}
    } catch (error) {
        return {satatus:"fail",data:error}.toString()
    }
}
const categoryListService =async()=>{
    try {
        let data =await ProductCategoryModel.find()
        return {satatus:"success",data:data}
    } catch (error) {
        return {satatus:"fail",data:error}.toString()
    }
}
const sliderListService =async()=>{
    try {
        let data =await ProductSliderModel.find()
        return {satatus:"success",data:data}
    } catch (error) {
        return {satatus:"fail",data:error}.toString()
    }
}

const productListByBrandService = async (req) => {
    try {
      let brandId = new ObjectId(req.params.brandId);
      let matchStage = { $match: { brandID: brandId } };
      let joinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
     let joinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
      let unWindBrandStage = { $unwind: "$brand" };
      let unWindCategoryStage = { $unwind: "$category" };
      let projectionStage = { $project: { 'brand._id': 0, 'category._id':0 ,'categoryID':0 , 'brandID': 0 } };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithBrandStage,  unWindBrandStage,joinWithCategoryStage,unWindCategoryStage, projectionStage
      ]);
       
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

  const productListByCategoryService = async (req) => {
    try {
      let categoryId = new ObjectId(req.params.categoryId);
      let matchStage = { $match: { categoryID: categoryId } };
      let joinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
      let joinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
      let unWindBrandStage = { $unwind: "$brand" };
      let unWindCategoryStage = { $unwind: "$category" };
      let projectionStage = { $project: { 'brand._id': 0, 'category._id':0 ,'categoryID':0 , 'brandID': 0 } };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithBrandStage,  unWindBrandStage,joinWithCategoryStage,unWindCategoryStage, projectionStage
      ]);
       
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

  const productListByRemarkService = async (req) => {
    try {
      let Remark = new ObjectId(req.params.remark);
      let matchStage = { $match: { remark: Remark } };
      let joinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
      let joinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
      let unWindBrandStage = { $unwind: "$brand" };
      let unWindCategoryStage = { $unwind: "$category" };
      let projectionStage = { $project: { 'brand._id': 0, 'category._id':0 ,'categoryID':0 , 'brandID': 0 } };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithBrandStage,  unWindBrandStage,joinWithCategoryStage,unWindCategoryStage, projectionStage
      ]);
       
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

  const productListBySimilarService = async (req) => {
    try {
      let CategoryId = new ObjectId(req.params.categoryId);
      let matchStage = { $match: { categoryID: CategoryId} };
      let joinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
      let joinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
      let unWindBrandStage = { $unwind: "$brand" };
      let unWindCategoryStage = { $unwind: "$category" };
      let limitStage = {$limit:20}
      let projectionStage = { $project: { 'brand._id': 0, 'category._id':0 ,'categoryID':0 , 'brandID': 0 } };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithBrandStage,  unWindBrandStage,joinWithCategoryStage,unWindCategoryStage,limitStage, projectionStage
      ]);
     
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

  const productDetailService = async (req) => {
    try {
      let productId = new ObjectId(req.params.productId);
      let matchStage = { $match: { _id: productId} };
      let joinWithDetailStage = { $lookup: { from: "productdetails", localField: "_id", foreignField: "productID", as: "details" } };
      let unWindDetailStage = { $unwind: "$details" };
      let limitStage = {$limit:20}
      let projectionStage = { $project: { 'productID':0,'_id':0,'details._id':0} };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithDetailStage,  unWindDetailStage,limitStage, projectionStage
      ]);
       
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

  const productListByKeywordService = async (req) => {
    try {
      let searchRegex = {$regex:req.params.keyword,'$options':'i'}
      let searchParams =[{title:searchRegex},{shortDes:searchRegex}]
      let searchQuery = {$or:searchParams}
      let matchStage = { $match: searchQuery };
      let joinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } };
     let joinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } };
      let unWindBrandStage = { $unwind: "$brand" };
      let unWindCategoryStage = { $unwind: "$category" };
      let projectionStage = { $project: { 'brand._id': 0, 'category._id':0 ,'categoryID':0 , 'brandID': 0 } };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithBrandStage,  unWindBrandStage,joinWithCategoryStage,unWindCategoryStage, projectionStage
      ]);
       
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

  const productReviewListService = async (req) => {
    try {
      let productId = new ObjectId(req.params.productId);
      let matchStage = { $match: { productID: productId} };
      let joinWithProfileStage = { $lookup: { from: "profiles", localField: "userID", foreignField: "userID", as: "profile" } };
      let unWindProfileStage = { $unwind: "$profile" };
      let projectionStage = { $project: { 'des':1,'rating':1,'profile.cus_name':1} };
  
      let data = await ProductModel.aggregate([
        matchStage, joinWithProfileStage,  unWindProfileStage, projectionStage
      ]);
      
      return { status: "success", data:data };
    } catch (error) {
      return { status: "fail", data:error};
  }
  };

module.exports = {brandListService,categoryListService,sliderListService,
    productListByBrandService,productListByCategoryService,productListByRemarkService,productListBySimilarService,
    productDetailService,productListByKeywordService,productReviewListService}