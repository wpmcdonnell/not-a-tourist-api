const mongoose = require('mongoose')

const dcPostSchema = new mongoose.Schema({
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
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Dcpost', dcPostSchema)
