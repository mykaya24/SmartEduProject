const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    unique: true,
    default: function(){
      return slugify(this.name,{lower:true,strict:true});
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
