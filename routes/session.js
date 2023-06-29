const express = require('express')
const router = express.Router()

// const bcrypt = require('bcrypt')
const db = require('../db/index')

router.get('/login', (req, res) => {
  res.render('session/login', { layout: false })
})

// session middleware will provide a session object for use req.session
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const sql = `SELECT * FROM user_account WHERE email= '${email}';`

  db.query(sql, (err, dbRes) => {
    // console.log(err)

    if (dbRes.rows.length === 0) {
      res.render('session/login', { layout: false })
      return
    }

    // const storedPassword = dbRes.rows[0].password_digest

    // bcrypt.compare(password, storedPassword, (err, result) => {
    //   if (err) {
    //     console.log(err)
    //   }
    //   if (result) {
    req.session.userId = dbRes.rows[0].id
    res.redirect('/')
    //       } else {
    //         res.render('login')
    //       }
    //     })
  })
})

router.delete('/logout', (req, res) => {
  req.session.userId = undefined
  res.redirect('/login')
})

module.exports = router
