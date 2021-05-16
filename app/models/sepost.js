const mongoose = require('mongoose')

const sePostSchema = new mongoose.Schema({
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
    required: true
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
},
{
  timestamps: true
})

module.exports = mongoose.model('Sepost', sePostSchema)
