const pg = require('pg')

console.log('DATABSE::::::', process.env.DATABASE_URL)
const db = new pg.Pool({
  // database: 'goodfoodhunting',
  connectionString: process.env.DATABASE_URL,
})

module.exports = db
