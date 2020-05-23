const {Pool} = require('pg')
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'node',
  password: '123456',
  port: 5432,
});


module.exports = pool;