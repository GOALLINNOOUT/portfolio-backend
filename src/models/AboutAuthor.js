const mongoose = require('mongoose');

const aboutAuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'ADELA'
  },
  bio: {
    type: String,
    required: true,
    trim: true,
    default: 'ADELA writes about product decisions, web systems, and the practical lessons that show up while building useful digital experiences.'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AboutAuthor', aboutAuthorSchema);
