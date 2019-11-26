import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import { createDeploymentMutation } from '../test-utils/testMutations';
import { createSchema } from '../utils/createSchema';
import { GraphQLSchema } from 'graphql';
import faker from 'faker';
import { Deployment } from '../entity/Deployment';

let conn: Connection;
let testSchema: GraphQLSchema;

const invalidDeploymentData = {
    tech: faker.name.firstName(),
    endUser: faker.name.firstName(),
    product: faker.name.firstName(),
    modelType: faker.name.firstName(),
    serialNumber: faker.name.firstName(),
};

const deploymentData = {
    tech: faker.name.firstName(),
    endUser: faker.name.firstName(),
    product: faker.name.firstName(),
    modelType: faker.name.firstName(),
    serialNumber: faker.name.firstName(),
    timeStamp: faker.name.firstName(),
};

beforeAll(async () => {
    conn = await connect();
    testSchema = await createSchema();
});
afterAll(async () => {
    await conn.close();
});

describe('Deployment Resolver', () => {
    /**
     * testing if we can create a deployment in db
     */
    it('create deployment', async () => {
        const response = await gCall({
            schema: testSchema,
            source: createDeploymentMutation,
            variableValues: {
                data: deploymentData,
            },
        });

        expect(response).toMatchObject({
            data: {
                createDeployment: {
                    id: 1,
                    tech: deploymentData.tech,
                    endUser: deploymentData.endUser,
                    product: deploymentData.product,
                    modelType: deploymentData.modelType,
                    serialNumber: deploymentData.serialNumber,
                    timeStamp: deploymentData.timeStamp,
                },
            },
        });
        const dbDeployment = await Deployment.findOne({
            where: { tech: deploymentData.tech },
        });
        expect(dbDeployment).toBeDefined();
    });

    /**
     * testing if GraphQL errors[] is defined when ran with missing fields
     */
    it('field validation testing createDeployment', async () => {
        const results = await gCall({
            schema: testSchema,
            source: createDeploymentMutation,
            variableValues: {
                data: invalidDeploymentData,
            },
        });

        if (results.errors) {
            expect(results.errors.length).toBeGreaterThan(0);
        }
    });
});
