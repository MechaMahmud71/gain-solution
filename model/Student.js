const mongoose=require("mongoose");

const Schema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  dateOfBirth:{
    type:Date,
    required:true
  },
  subjects:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subject"
  }]
})


module.exports = mongoose.model('Student', Schema);