import { createConnection, Connection } from 'typeorm';

/**
 * creating a typeorm test connection
 */
export const connect = async (): Promise<Connection> => {
    return await createConnection({
        name: 'default',
        type: 'sqlite',
        database: 'test-database.sqlite',
        synchronize: true,
        dropSchema: true,
        entities: ['src/entity/**/*.ts'],
        cli: {
            entitiesDir: 'src/entity',
        },
    });
};
