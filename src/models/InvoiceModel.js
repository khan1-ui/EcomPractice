const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    userId:{type:String,required:true},
    payable:{type:String,required:true},
    cus_details:{type:String,required:true},
    ship_details:{type:String,required:true},
    trans_id:{type:String,required:true},
   valid_id:{type:String,required:true},
   delivery_status:{type:String,required:true},
   payment_status:{type:String,required:true},
   total:{type:String,required:true},
   vat:{type:String,required:true},
},{timestamps:true,versionKey:true})
const InvoiceModel = mongoose.model('invoices',DataSchema)
module.exports= InvoiceModel