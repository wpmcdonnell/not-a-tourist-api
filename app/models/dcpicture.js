const mongoose = require('mongoose')

const dcPictureSchema = new mongoose.Schema({
  url: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  list: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvote: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Dcpicture', dcPictureSchema)
