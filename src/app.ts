import 'reflect-metadata'
import { createConnection, getConnectionOptions } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloWorldResolver } from './resolvers/HelloWorldResolver'
import { MovieResolver } from './resolvers/MovieResolver'
;(async (): Promise<void> => {
  // initialize express
  const app = express()
  /**
   * setting options as either env from .env or development
   */
  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development'
  )
  /**
   * creating typeorm connection with env options and default name
   */
  await createConnection({ ...options, name: 'default' })
  /**
   * initializing Apollo server
   * building schema by passing in our resolvers to buildSchema
   * passing in context to apollo server
   */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, MovieResolver],
    }),
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    context: ({ req, res }) => ({ req, res }),
  })
  /**
   * padding in our express instance and cors options to apollo
   */
  apolloServer.applyMiddleware({ app, cors: false })
  /**
   * creating our listening port
   */
  const port = process.env.PORT || 4000
  /**
   * running our express app if not test/dev environment
   */
  if (process.env.NODE_ENV !== ('test' || 'development')) {
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`)
    })
  }
})()
