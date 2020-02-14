import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import {
    ApolloServer,
    ValidationError,
    UserInputError,
} from 'apollo-server-express';
import { createSchema } from './utils/createSchema';
import cors from 'cors';
/**
 * Initializing our apps
 * Creating a schema with buildSchema and feeding to apollo
 * Applying middleware to Apollo
 * Express listening on port
 */
(async (): Promise<void> => {
    const app = express();
    app.use(cors());

    const options = await getConnectionOptions(
        process.env.NODE_ENV || 'development'
    );

    await createConnection({ ...options, name: 'default' });

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        context: ({ req, res }) => ({
            req,
            res,
        }),
        formatError: (err: Error): Error => {
            if (err.message.startsWith('Field ')) {
                return new ValidationError('Missing field in mutation.');
            }
            if (err.message.startsWith('Expected type '))
                return new UserInputError('Invalid type for given input.');
            return err;
        },
    });

    apolloServer.applyMiddleware({ app, cors: true });

    const port = process.env.PORT || 4000;

    if (process.env.NODE_ENV !== ('test' || 'development')) {
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
})();
