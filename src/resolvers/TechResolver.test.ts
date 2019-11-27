import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import { createSchema } from '../utils/createSchema';
import { GraphQLSchema } from 'graphql';

let conn: Connection;
let testSchema: GraphQLSchema;

beforeAll(async () => {
    conn = await connect();
    testSchema = await createSchema();
});
afterAll(async () => {
    await conn.close();
});
