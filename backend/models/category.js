const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
    require: true,
  },
  vacancy: {
    type: Number,
    require: true,
  },
});
const categoryModel = mongoose.model('category',categorySchema)
module.exports = categoryModel