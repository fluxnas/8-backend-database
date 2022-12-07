const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// 1 // pointers /users renvoie user
// (req, res) => {
//     res.json(users)
//   }
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.json(results.rows)
  })
}

// 2 // pointers users/id renvoie lusers defini par l'id
// (req, res) => {
//     const id = Number(req.params.id)  
//     const user = users.find(user => user.id === id)
//     res.json(user)
// }
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.json(results.rows)
  })
}

// 3 // ajouter créer un user 
// (req, res) => {
// 	const { id, nom, prenom } = req.body
// 	// console.log(id, nom, prenom);
// 	users.push({
// 		id,
// 		nom,
// 		prenom
// 	})
// 	res.json(users)
// }
const createUser = (request, response) => {
  const { nom, prenom } = request.body
  pool.query('INSERT INTO users (nom, prenom) VALUES ($1, $2)', [nom, prenom], (error, results) => {
    if (error) {
      throw error
    }
    response.send(`User added with ID: ${results.insertId}`)
  })
}

// 4 // mise a jour du user tester l'api dans insomnia 
// (req, res) => {
// 	const Userid = Number(req.params.id)
// 	const {id, nom, prenom} = req.body

// 	users = users.map(function(user) {
// 		if(user.id === Userid) {
// 			return {
// 				id,
// 				nom,
// 				prenom
// 			}
// 		}
// 		return user
// 	}) 
// 	res.json(users)
// }
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { nom, prenom } = request.body
  pool.query(
    'UPDATE users SET nom = $1, prenom = $2 WHERE id = $3',
    [nom, prenom, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.send(`User modified with ID: ${id}`)
    }
  )
}

// 5 // pointer un id et supprimer la ressource  // tester dans postman avec verbe DELETE
// (req, res) => {
// 	const id = Number(req.params.id)
// 	users = users.filter(user => user.id !== id)
// 	res.status(204).end()
//   }
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}