import pkg from 'pg';
const { Client } = pkg;

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

let UserTableQuery = `CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL,
  "first_name" VARCHAR(50) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL ,
  "email" VARCHAR(50) NOT NULL,
  "ip" VARCHAR(50) NOT NULL,
  PRIMARY KEY ("id")
  )`



client.query(UserTableQuery,  (err, res) => {
  if (err) throw err
  console.log(res)
  client.end()
})









