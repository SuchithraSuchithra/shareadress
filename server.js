// Load ENV config file
require('dotenv').config()

// Imports
const express = require('express')
const app = express()
const dressRouter = require('./routes/dress')
const followRouter = require('./routes/follow')
const sessionRouter = require('./routes/session')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const setUser = require('./middlewares/set_user')
// App setting
app.set('view engine', 'ejs')

// Global variables
const port = process.env.PORT || 5000

// MIDDLEWARES
// To fetch the post requrest body
app.use(express.urlencoded({ extended: true }))
// To fetch the static files
app.use(express.static('public'))
// To use express layouts
app.use(expressLayouts)
// To accept put and delete request as post
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST body and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  })
)
// session
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
)

app.use(setUser)

// Routers
app.get('/', (req, res) => {
  res.render('home')
})

app.use('/', sessionRouter)
app.use('/dresses', dressRouter)
app.use('/follow', followRouter)

// Server request Listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
