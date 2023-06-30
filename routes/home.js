const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/', (req, res) => {
  const userId = req.session.userId
  if (userId) {
    // const sql = `SELECT * FROM dress WHERE posted_by IN (SELECT id FROM follow WHERE follower = $1)`
    const sql = `SELECT d.id, d.title, d.price, d.photo_url,d.website_url, u.first_name, u.last_name FROM dress d JOIN user_account u ON d.posted_by = u.id WHERE d.posted_by IN (SELECT id FROM follow WHERE follower = $1)`

    db.query(sql, [userId], (err, dbRes) => {
      console.log('HOME', dbRes)
      // Get wishlisted information
      const sql = `SELECT dress_id FROM wishlist WHERE user_id=$1`
      db.query(sql, [userId], (err, wishlistRes) => {
        const wishlistedIds = wishlistRes.rows.map((item) => item.dress_id)
        res.render('home', { dresses: dbRes.rows, userId, wishlistedIds })
      })
    })
  } else {
    const sql = `SELECT * FROM dress`
    db.query(sql, (err, dbRes) => {
      res.render('home', { dresses: dbRes.rows })
    })
  }
})

module.exports = router
