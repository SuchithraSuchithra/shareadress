const pg = require('pg')

console.log('DATABSE::::::', process.env.DATABASE_URL)
const db = new pg.Pool({
  // database: 'goodfoodhunting',
  connectionString: process.env.DATABASE_URL,
})

// const config = {
//   dev: {
//     connectionString: process.env.DATABASE_URL,
//   },
//   prod: {
//     connectionString: process.env.DATABASE_URL,
//   },
// }

// const db = new pg.Pool(process.env.DATABSE_URL ? config.prod : config.dev)
module.exports = db
