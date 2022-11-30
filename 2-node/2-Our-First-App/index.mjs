import pkg from 'pg';
const { Client } = pkg;

import users from './users.mjs';


const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin_postgres_project',
  password: 'mardi29novembre',
  database: 'postgres_project'
})


client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
    // client.end()
  }

})

// console.log(users)

users.forEach((user) => {
	let text = 'INSERT INTO users(first_name, last_name, email, ip) VALUES($1, $2, $3, $4) RETURNING *'
	let values = [user.first_name, user.last_name, user.email, user.ip]
	 
	// callback
	client.query(text, values, (err, res) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    console.log(res.rows[0])
	  }
	})

})
