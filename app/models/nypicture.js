const mongoose = require('mongoose')

const nyPictureSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Nypicture', nyPictureSchema)
