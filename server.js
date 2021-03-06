// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
const userRoutes = require('./app/routes/user_routes')
const genpostRoutes = require('./app/routes/genpost_routes')
const commentRoutes = require('./app/routes/comment_routes')
const nyPostRoutes = require('./app/routes/nypost_routes')
const dcPostRoutes = require('./app/routes/dcpost_routes')
const sePostRoutes = require('./app/routes/sepost_routes')
const laPostRoutes = require('./app/routes/lapost_routes')
const parPostRoutes = require('./app/routes/parpost_routes')
const tyoPostRoutes = require('./app/routes/tyopost_routes')
const nyPictureRoutes = require('./app/routes/nypicture_routes')
const sePictureRoutes = require('./app/routes/sepicture_routes')
const laPictureRoutes = require('./app/routes/lapicture_routes')
const dcPictureRoutes = require('./app/routes/dcpicture_routes')
const parPictureRoutes = require('./app/routes/parpicture_routes')
const tyoPictureRoutes = require('./app/routes/tyopicture_routes')
const genPictureRoutes = require('./app/routes/genpicture_routes')
// require middleware
const errorHandler = require('./lib/error_handler')
const requestLogger = require('./lib/request_logger')

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
app.use(userRoutes)
app.use(genpostRoutes)
app.use(commentRoutes)
app.use(nyPostRoutes)
app.use(sePostRoutes)
app.use(dcPostRoutes)
app.use(laPostRoutes)
app.use(parPostRoutes)
app.use(tyoPostRoutes)
app.use(nyPictureRoutes)
app.use(sePictureRoutes)
app.use(laPictureRoutes)
app.use(dcPictureRoutes)
app.use(parPictureRoutes)
app.use(tyoPictureRoutes)
app.use(genPictureRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
