const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const resolvers = require('./resolvers')
const schema = require('./schema')

const server = new ApolloServer({ typeDefs: schema, resolvers })

const port = 3050

mongoose.connect('mongodb://localhost:27017/cpbmais', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('MongoDB conectado')

  server.listen(port).then(() => {
    console.log(`
    Servidor ouvindo na porta ${port}
    Link do servidor http://localhost:${port}
    Acesse http://localhost:${port}/graphql para acessar o playground
    `)
  })
}).catch(error => {
  console.error(error)
})
