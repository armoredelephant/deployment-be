import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import { createDeploymentMutation } from '../test-utils/testMutations';
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

describe('Deployment Resolver', () => {
    it('create deployment', async () => {
        console.log(
            await gCall({
                schema: testSchema,
                source: createDeploymentMutation,
                variableValues: {
                    data: {
                        tech: 'Keith',
                        endUser: 'Salleena',
                        product: 'Test',
                        modelType: 'Test',
                        serialNumber: 'test',
                        timeStamp: 'now',
                    },
                },
            })
        );
    });
});
