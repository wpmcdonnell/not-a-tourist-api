const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
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
  comments: [{ type: mongoose.Schema.ObjectId,
    ref: 'Comment',
    required: false}]
},
{
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
