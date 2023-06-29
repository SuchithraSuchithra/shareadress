const express = require('express')
const router = express.Router()
const db = require('../../db')

// ROUTES

// Get all users
router.get('/', (req, res) => {
  const userId = req.session.userId
  const sql = `SELECT * FROM user_account WHERE ID NOT IN (SELECT id FROM follow WHERE follower = $1) AND ID != $2;`
  db.query(sql, [userId, userId], (err, dbRes) => {
    console.log(err, dbRes.rows)
    res.render('follow/index', { users: dbRes.rows })
  })
})

router.post('/:id', (req, res) => {
  const userId = req.session.userId
  const sql = `INSERT into follow (id, follower) VALUES ($1, $2)`
  db.query(sql, [req.params.id, userId], (err, dbRes) => {
    res.redirect('/follow/')
  })
})

module.exports = router
