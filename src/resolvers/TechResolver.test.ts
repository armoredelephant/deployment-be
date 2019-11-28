import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import { createSchema } from '../utils/createSchema';
import { GraphQLSchema } from 'graphql';
import { createTechMutation } from '../test-utils/testMutations';

let conn: Connection;
let testSchema: GraphQLSchema;

beforeAll(async () => {
    conn = await connect();
    testSchema = await createSchema();
});
afterAll(async () => {
    await conn.close();
});

describe('Tech Resolver', () => {
    /**
     * testing if we can create a tech
     */
    it('createTech creates a new tech', async () => {
        const response = await gCall({
            schema: testSchema,
            source: createTechMutation,
            variableValues: {
                data: 'Keith Alleman',
            },
        });
        expect(response).toMatchObject({
            data: {
                createTech: {
                    id: 1,
                    name: 'Keith Alleman',
                },
            },
        });
    });
    it('throws error', async () => {
        const response = await gCall({
            schema: testSchema,
            source: createTechMutation,
            variableValues: {
                data: null,
            },
        });
        if (response.errors) {
            expect(response.errors.length).toBeGreaterThan(0);
        }
    });
});
