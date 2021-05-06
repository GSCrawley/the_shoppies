
const { ApolloServer, gql} = require('apollo-server');

require('dotenv').config()

const cors = require('cors')

const fetch = require('node-fetch')

const typeDefs = gql`
	type Film {
		title: String!
		release_date: String!
	}

	type Query {
		getFilms(title: String!, release_date: String!): [Film!]!
	}

	type Mutation {
		addFilm(title: String!): Film!
	}
`


	// resolvers here
const root = {
    getFilms: async () => {
        const apikey = process.env.OMDb_API_KEY
        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}`
        const res = await fetch(url)
        const json = await res.json()
        const title = json.fetch.title
        const release_date = json.fetch.release_date
        return { title, release_date }
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, root });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


server.use(cors())

// // Defining   a route for GraphQL
// app.use('/graphql', graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true
//   }))
  
// // Start this app
// const port = 4000
// app.listen(port, () => {
//   console.log('Running on port:'+port)
// })
