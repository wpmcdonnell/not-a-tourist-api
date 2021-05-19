const mongoose = require('mongoose')

const laPictureSchema = new mongoose.Schema({
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
  },
  upvoteUserId: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Lapicture', laPictureSchema)
