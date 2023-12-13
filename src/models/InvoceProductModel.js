const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,required:true},
    invoiceId:{type:mongoose.Schema.Types.ObjectId,required:true},
    qty:{type:String,required:true},
    color:{type:String,required:true},
    size:{type:String,required:true}
},{timestamps:true,versionKey:true})
const InvoiceProductModel = mongoose.model('invoiceproducts',DataSchema)
module.exports = InvoiceProductModel