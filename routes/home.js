const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/', (req, res) => {
  const userId = req.session.userId
  if (userId) {
    const sql = `SELECT * FROM dress WHERE posted_by IN (SELECT id FROM follow WHERE follower = $1)`
    db.query(sql, [userId], (err, dbRes) => {
      res.render('home', { dresses: dbRes.rows })
    })
  } else {
    const sql = `SELECT * FROM dress`
    db.query(sql, (err, dbRes) => {
      res.render('home', { dresses: dbRes.rows })
    })
  }
})

module.exports = router
