require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const dressRouter = require('./routes/dress')

app.set('view engine', 'ejs')
const expressLayouts = require('express-ejs-layouts')

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use(expressLayouts)
app.get('/', (req, res) => {
  res.render('home')
})

app.use('/dresses', dressRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
