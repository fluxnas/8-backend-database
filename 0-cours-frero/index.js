// importe express :
const express = require('express')

// creation app qui depends de express :
const app = express()

// on dit a notre app decouter sur port :
const port = 8080
app.listen(8080, () => {  console.log('Serveur a lecoute') })

// express.json() est une fonction middleware intégrée dans Express
// Elle analyse les requêtes JSON entrantes et place les données analysées dans req.body.
app.use(express.json())

// app.METHODE(CHEMIN, GESTIONNAIRE(req, res))
// METHODE : get, post, delete, ...
//
// exemple :
// app.get('/pokemons/1, (req, res) => res.sen('les infos du pok 1'))
// app.post('/pokemons', (req, res) => res.send('vous ajouter un pok au pokedex'))
// app.put('/pokemons/1', (req, res) => res.send('vous modifier le pok 1'))
// app.delete('/pokemons/1' (req, res) => res.send('le pok 1 est suppr'))
// app.delete('/pokemons'), (req, res) => res.send('tous les pok suppr')

// /books - GET - get the collection of books
// /books - POST - insert into the collection
// /book/:id - GET - get the book with :id
// /book/:id - PUT - update the book with :id
// /book/:id - DELETE - delete the book with :id


let users = [
	{
		id: 1,
		"nom": "connier",
		"prenom": "sasha"
	},
	{
		id:2,
		"nom":"connier autajon",
		"prenom":"hanna"
	},
	{
		id: 3,
		"nom":"connier",
		"prenom":"tamara"  
	},
	{
		id: 4,
		"nom":"autajon",
		"prenom":"tatiana"
	}
]


// pointer la première page : local8080 qui renvoie 'hello again'
app.get('/', (req, res) => {
	res.send('hello again')
	}
)
// pointers /users renvoie user
		// res.status() > defini un status pour la response
		// res.json() > renvoie une promesse JSON : JSON en entrée et analyse pour produire un objet JavaScript. 
 app.get('/api/users', (req, res) => {
    res.json(users)
  })


//	delete - url = POST /user/delete/id 
//	update- url = POST /user/update/id => il faut passer le parametre a update 
//	insert- url = POST /user/create => il faut passer le nom et le prenom pour l' add dans la bdd
//	ect...

// pointers users/id renvoie lusers defini par l'id
 app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)  
  const user = users.find(user => user.id === id)
  res.json(user)

})


// pointer users/0 recuperer les infos du users 0 :
app.get('/api/users/0', (req, res) => {
	res.status(202).json(users[0])
})


// pointer un id et supprimer la ressource  // tester dans postman avec verbe DELETE
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id)
  users = users.filter(user => user.id !== id)
  res.status(204).end()
})

// ajouter créer un user 
app.post('/api/users', (req, res) => {  
	const user = req.body 
	users.push({
		id : 5,
    "nom" : "connier",
    "prenom" : "jf"
	},
	{
		id : 6,
    "nom" : "pop",
    "prenom" : "loli"
	}
	) 
	console.log(user)  
	res.json(users)
})


// mise a jour du user tester l'api dans insomnia 
app.put('/api/users/:id', function(req, res) {
	const Userid = Number(req.params.id)
	const {id, nom, prenom} = req.body

	users = users.map(function(user) {
		if(user.id === Userid) {
			return {
				id,
				nom,
				prenom
			}
		}
		return user
	}) 
	res.json(users)
})








