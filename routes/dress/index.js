const express = require('express')

const router = express.Router()

const db = require('../../db')

router.get('/', (req, res) => {
  const dressId = req.params.id
  const sql = `SELECT * FROM dress;`
  db.query(sql, (err, dbRes) => {
    console.log(err, dbRes.rows[0])
    // res.send('item retrieval')
    res.render('dresses/show', { dress: dbRes.rows[0] })
  })
})

router.get('/new', (req, res) => {
  res.render('dresses/new')
})

router.get('/:id', (req, res) => {
  const dressId = req.params.id
  const sql = `SELECT * FROM dress WHERE id=$1`
  db.query(sql, [dressId], (err, dbRes) => {
    console.log(err, dbRes.rows)
    // res.send('item retrieval')
    res.render('dresses/show', { dress: dbRes.rows[0] })
  })
})

router.post('/', (req, res) => {
  const sql = `INSERT INTO dress (title, price, photo_url, posted_by) VALUES ($1, $2, $3, 1) RETURNING id;`

  const title = req.body.title
  const price = req.body.price
  const photUrl = req.body.imageurl

  db.query(sql, [title, price, photUrl], (err, dbRes) => {
    console.log(err)
    const dressId = dbRes.rows[0].id
    res.redirect(`/dresses/${dressId}`)
  })
})

module.exports = router
