const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()

const schema = buildSchema(`
# schema here
type Test {
	message: String!
}
`)

const root = {
    getFilms: async () => {
        const apikey = process.env.OMDb_API_KEY
        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}
        `
    }
	// resolvers here
}

// Create an express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))
  
// Start this app
const port = 4000
app.listen(port, () => {
  console.log('Running on port:'+port)
})
