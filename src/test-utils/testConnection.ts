import { createConnection, Connection } from 'typeorm';

/**
 * creating a typeorm test connection
 */
export const connect = async (drop = false): Promise<Connection> => {
    return await createConnection({
        name: 'default',
        type: 'sqlite',
        database: 'test-database.sqlite',
        synchronize: drop,
        dropSchema: drop,
        entities: ['src/entity/**/*.ts'],
        cli: {
            entitiesDir: 'src/entity',
        },
    });
};
