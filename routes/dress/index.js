const express = require('express')
const router = express.Router()
const db = require('../../db')

// ROUTES

// Get all dresses posted by the logged in user
router.get('/', (req, res) => {
  const userId = req.session.userId
  const sql = `SELECT * FROM dress WHERE posted_by=$1;`
  db.query(sql, [userId], (err, dbRes) => {
    console.log(err, dbRes.rows[0])
    res.render('dresses/index', { dresses: dbRes.rows })
  })
})

// Get the post form to add new post
router.get('/new', (req, res) => {
  res.render('dresses/new')
})

// Get a specific dress by id posted by the logged in user
router.get('/:id', (req, res) => {
  const dressId = req.params.id
  const sql = `SELECT * FROM dress WHERE id=$1`
  db.query(sql, [dressId], (err, dbRes) => {
    console.log(err, dbRes.rows)
    res.render('dresses/show', { dress: dbRes.rows[0] })
  })
})

// Create a post
router.post('/', (req, res) => {
  const userId = req.session.userId
  const title = req.body.title
  const price = req.body.price
  const photUrl = req.body.imageurl
  const sql = `INSERT INTO dress (title, price, photo_url, posted_by) VALUES ($1, $2, $3, $4) RETURNING id;`
  db.query(sql, [title, price, photUrl, userId], (err, dbRes) => {
    console.log(err)
    const dressId = dbRes.rows[0].id
    res.redirect(`/dresses/${dressId}`)
  })
})

// Delete a post
router.delete('/:id', (req, res) => {
  const dressId = req.params.id
  const sql = `DELETE FROM dress WHERE id=$1`

  db.query(sql, [dressId], (err, dbRes) => {
    res.redirect('/dresses')
  })
})

// Get the edit form to modify a new post
router.get('/:id/edit', (req, res) => {
  const dressId = req.params.id
  const sql = `SELECT * FROM dress WHERE id=$1`
  db.query(sql, [dressId], (err, dbRes) => {
    console.log(err, dbRes.rows)
    res.render('dresses/edit', { dress: dbRes.rows[0] })
  })
  // res.render('dresses/edit')
})

// Modify a post
router.put('/:id', (req, res) => {
  const dressId = req.params.id
  const title = req.body.title
  const price = req.body.price
  const photUrl = req.body.imageurl
  const sql = `UPDATE dress  SET title=$1 , price=$2, photo_url=$3, posted_by=$4 WHERE id=$5;`
  db.query(sql, [title, price, photUrl, 1, dressId], (err, dbRes) => {
    console.log(err, dbRes)
    res.redirect(`/dresses/${dressId}`)
  })
})

module.exports = router
