const db = require('../db')

function setUser(req, res, next) {
  res.locals.userId = req.session.userId
  if (!req.session.userId) {
    next()
    return
  }

  let sql = `SELECT * FROM user_account WHERE id= ${req.session.userId}`

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      // console.log('DBResponse', dbRes)
      res.locals.user = dbRes.rows[0]
      // console.log('The user is', res.locals.user)
      next()
    }
  })
}

module.exports = setUser
