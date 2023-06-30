const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('../db/index')

router.get('/signup', (req, res) => {
  res.render('session/signup')
})

router.post('/signup', (req, res) => {
  const sql = `INSERT INTO user_account (first_name, last_name, username, email,password_digest, photo_url) VALUES ($1, $2,$3, $4, $5, $6); `

  // Generate a salt
  bcrypt.genSalt(saltRounds, (err, salt) => {
    // hash/digest the password
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      // insert into the  users table
      db.query(
        sql,
        [
          req.body.first_name,
          req.body.last_name,
          req.body.username,
          req.body.email,
          hash,
          req.body.photo_url,
        ],
        (err, dbRes) => {
          console.log(err, dbRes)
          res.redirect('/login')
        }
      )
    })
  })
})

router.get('/login', (req, res) => {
  res.render('session/login')
})

// session middleware will provide a session object for use req.session
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const sql = `SELECT * FROM user_account WHERE email= $1;`
  db.query(sql, [email], (err, dbRes) => {
    if (dbRes.rows.length === 0) {
      console.log('No record found')
      res.render('session/login')
      return
    }

    const storedPassword = dbRes.rows[0].password_digest

    bcrypt.compare(password, storedPassword, (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result) {
        req.session.userId = dbRes.rows[0].id
        res.redirect('/')
      } else {
        res.render('session/login')
      }
    })
  })
})

router.get('/logout', (req, res) => {
  req.session.userId = undefined
  res.redirect('/login')
})

module.exports = router
