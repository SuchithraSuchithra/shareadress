const express = require('express')
const router = express.Router()
const db = require('../../db')

// ROUTES

// Get all users
router.get('/', (req, res) => {
  const userId = req.session.userId
  const sql = `SELECT * FROM user_account;`
  db.query(sql, (err, dbRes) => {
    console.log(err, dbRes.rows)
    res.render('follow/index', { users: dbRes.rows })
  })
})

router.post('/:id', (req, res) => {
  const userId = req.session.userId
  const sql = `INSERT into following (id, followed_by) VALUES ($1, $2)`
  db.query(sql, [userId, req.params.id], (err, dbRes) => {
    res.redirect('/')
  })
})

module.exports = router
