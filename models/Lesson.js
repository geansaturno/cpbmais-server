const mongoose = require('mongoose')

module.exports = mongoose.model('Lesson', new mongoose.Schema({
  day: String,
  title: String,
  content: String,
  image: String,
  verse: String,
  date: Date
}))
