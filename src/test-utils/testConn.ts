import { createConnection, Connection } from 'typeorm';

/**
 * creating a typeorm test connection
 */
export const testConn = async (drop = false): Promise<Connection> => {
    return await createConnection({
        name: 'development',
        type: 'sqlite',
        database: 'testdatabase.sqlite',
        synchronize: drop,
        dropSchema: drop,
        entities: ['src/entity/**/*.ts'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
    });
};
