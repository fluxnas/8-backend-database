const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// app.use(express.json())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const db = require('./queries')

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
  })

// 1 // pointers /users renvoie user
 app.get('/users', db.getUsers)

// 2 // pointers users/id renvoie lusers defini par l'id
 app.get('/users/:id', db.getUserById)

// 3 // ajouter créer un user 
app.post('/users', db.createUser)

// 4 // mise a jour du user tester l'api dans insomnia 
app.put('/users/:id', db.updateUser) 

// 5 // pointer un id et supprimer la ressource  // tester dans postman avec verbe DELETE
app.delete('/users/:id', db.deleteUser)


const port = 8080
app.listen(8080, () => {  console.log('Serveur a lecoute') })

