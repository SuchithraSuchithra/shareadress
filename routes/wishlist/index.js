const express = require('express')
const router = express.Router()
const db = require('../../db')

// ROUTES

// Get all users
router.get('/', (req, res) => {
  const userId = req.session.userId
  //const sql = `SELECT * FROM dress WHERE id IN (SELECT dress_id FROM wishlist WHERE user_id = $1);`
  const sql = `SELECT d.title, d.price, d.photo_url, d.website_url, u.first_name, u.last_name FROM dress d JOIN user_account u ON d.posted_by = u.id WHERE d.id IN (SELECT dress_id FROM wishlist WHERE user_id = $1);`
  db.query(sql, [userId], (err, dbRes) => {
    console.log(err, dbRes.rows)
    res.render('wishlist/index', { dresses: dbRes.rows })
  })
})

router.post('/', (req, res) => {
  const userId = req.session.userId
  const sql = `INSERT INTO wishlist (user_id, dress_id) VALUES ($1, $2)`
  db.query(sql, [userId, req.body.dress_id], (err, dbRes) => {
    res.redirect('/')
  })
})

module.exports = router
