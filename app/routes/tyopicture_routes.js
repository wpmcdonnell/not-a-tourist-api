const express = require('express')
const passport = require('passport')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const Tyopicture = require('../models/tyopicture')
const User = require('../models/user')

const requireToken = passport.authenticate('bearer', { session: false })
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const router = express.Router()
const s3Upload = require('../../lib/s3_upload')
const removeBlanks = require('../../lib/remove_blank_fields')

router.post('/tokyo-posts-pictures', requireToken, upload.single('picture'), (req, res, next) => {
  console.log('this is my req.file when upload', req.file)
  console.log('this is my req.user when text', req.user)
  s3Upload(req.file)
    .then(awsFile => {
      return Tyopicture.create({ url: awsFile.Location, owner: req.user.id, title: req.body.title, list: req.body.list, type: 'picture', upvote: 0, upvoteUserId: [1] })
    })
  //  req.body => { upload: { url: 'www.blank.com' } }
    .then(pictureDoc => {
      res.status(201).json({ picture: pictureDoc })
      console.log('This is picdoc', pictureDoc)
    })
    .catch(next)
})

// this would just get picture data
// INDEX aka GET all
router.get('/tokyo-posts-pictures', requireToken, (req, res, next) => {
  // find all pictures where the privacy of the owner is false
  // if the owner is getting the pictures, show them their pictures as well
  console.log(req.user, 'my user')
  Tyopicture.find()
    .then(handle404)
    .then(pictures => {
      pictures = pictures.map(picture => picture.toObject())
      return Promise.all(pictures.map(picture => {
        return User.findById(picture.owner).then(owner => {
          console.log(owner._id.toString(), req.user.id.toString())
          if (!owner.privacy || owner._id.toString() === req.user.id.toString()) {
            picture.ownerName = owner.username
            return picture
          } else {
            return 'private'
          }
        })
      }))
    }).then(pictures => {
      console.log(pictures)
      res.status(200).json({ pictures })
    }).catch(next)
})

router.get('/tokyo-posts-pictures', (req, res, next) => {
  // find all pictures where the privacy of the owner is false
  // if the owner is getting the pictures, show them their pictures as well
  Tyopicture.find()
    .then(handle404)
    .then(pictures => {
      pictures = pictures.map(picture => picture.toObject())
      return Promise.all(pictures.map(picture => {
        return User.findById(picture.owner).then(owner => {
          console.log(owner._id.toString())
          if (!owner.privacy) {
            picture.ownerName = owner.username
            return picture
          } else {
            return 'private'
          }
        })
      }))
    }).then(pictures => {
      console.log(pictures)
      res.status(200).json({ pictures })
    }).catch(next)
})

//
// INDEX aka GET all
// router.get('/home', requireToken, (req, res, next) => {
//   Tyopicture.find({ owner: req.user.id })
//     .then(handle404)
//     .then(pictures => {
//       pictures = pictures.map(picture => picture.toObject())
//       return Promise.all(pictures.map(picture => {
//         return User.findById(picture.owner).then(owner => {
//           picture.ownerName = owner.usernamecol
//           return picture
//         })
//       }))
//     }).then(pictures => {
//       res.status(200).json({ pictures })
//     }).catch(next)
// })

// // SHOW aka get by id
router.get('/tokyo-posts-pictures/:id', (req, res, next) => {
  Tyopicture.findById(req.params.id)
    .then(handle404)
    .then(picture => picture.toObject())
    .then(picture => User.findById(picture.owner)
      .then(owner => {
        picture.ownerName = owner.username
        return picture
      })
      .then(picture => {
        res.status(200).json({ picture: picture })
      })
    )
    .catch(next)
})

// // UPDATE picture caption
router.patch('/tokyo-posts-pictures/:id', removeBlanks, (req, res, next) => {
  delete req.body.picture.owner
  Tyopicture.findById(req.params.id)
    .then(handle404)
    .then(picture => {
      // requireOwnership(req, picture)
      return picture.updateOne(req.body.picture)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// DELETE
router.delete('/tokyo-posts-pictures/:id', requireToken, (req, res, next) => {
  Tyopicture.findById(req.params.id)
    .then(handle404)
    .then(picture => {
      requireOwnership(req, picture)
      picture.deleteOne()
      Tyopicture.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
