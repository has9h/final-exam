var mongoose = require('mongoose');

// Article Schema
var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  rating:{
    type: Number,
    required: true
  }
});

var Book = module.exports = mongoose.model('Book', bookSchema);