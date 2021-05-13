require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
// Read the file elsewhere, accept it here
module.exports = function (file) {
  const uploadParams = {
    Bucket: 'not-a-tourist-bucket',
    Key: +new Date() + '_' + file.originalname,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype
  }
  return s3.upload(uploadParams).promise()
}
