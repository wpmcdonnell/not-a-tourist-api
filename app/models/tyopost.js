const mongoose = require('mongoose')

const tyoPostSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: false
  },
  upvote: {
    type: Number,
    required: false
  },
  upvoteUserId: {
    type: Array,
    required: false
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Tyopost', tyoPostSchema)
