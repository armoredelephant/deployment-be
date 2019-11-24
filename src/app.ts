import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createSchema } from './utils/createSchema';
/**
 * Initializing our apps
 * Creating a schema with buildSchema and feeding to apollo
 * Applying middleware to Apollo
 * Express listening on port
 */
(async (): Promise<void> => {
    const app = express();

    const options = await getConnectionOptions(
        process.env.NODE_ENV || 'development'
    );

    await createConnection({ ...options, name: 'default' });

    const apolloServer = new ApolloServer({
        schema: await createSchema(), // resolvers are in createSchema util
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    const port = process.env.PORT || 4000;

    if (process.env.NODE_ENV !== ('test' || 'development')) {
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
})();
