import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { MovieResolver } from './resolvers/MovieResolver'
/**
 * Initializing our apps
 * Creating a schema with buildSchema and feeding to apollo
 * Applying middleware to Apollo
 * Express listening on port
 */
import { TechResolver } from './resolvers/TechResolver'
;(async (): Promise<void> => {
  const app = express()

  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  )

  await createConnection({ ...options, name: 'default' })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MovieResolver, TechResolver],
    }),
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    context: ({ req, res }) => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const port = process.env.PORT || 4000

  if (process.env.NODE_ENV !== ('test' || 'development')) {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`)
    })
  }
})()
