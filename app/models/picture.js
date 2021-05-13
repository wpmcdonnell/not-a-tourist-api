const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: false
  },
  tag: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  city: {
    type: String,
    required: false
  },
  postOwner: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Picture', pictureSchema)
