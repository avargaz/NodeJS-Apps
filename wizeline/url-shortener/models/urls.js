const mongoose = require('mongoose');

const URLSchema = mongoose.Schema({
  original:{
    type:String,
    required: true
  },
  shortened:{
    type:String,
    required:true
  },
  created_at:{
    type: Date
  }
});

const URL = module.exports = mongoose.model('URL',URLSchema)
