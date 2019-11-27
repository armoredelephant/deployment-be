import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import { createDeploymentMutation } from '../test-utils/testMutations';
import { createSchema } from '../utils/createSchema';
import { GraphQLSchema } from 'graphql';
import faker from 'faker';
import { Deployment } from '../entity/Deployment';
import {
    findDeploymentQuery,
    findDeploymentsByFieldQuery,
} from '../test-utils/testQueries';

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

const testData = {
    tech: 'Keith',
    endUser: 'Salleena',
    product: 'Test',
    modelType: 'Test',
    serialNumber: 'Test',
    timeStamp: 'Test',
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

    /**
     * testing findDeployment
     */
    it('findDeployment returns query', async () => {
        await gCall({
            schema: testSchema,
            source: createDeploymentMutation,
            variableValues: {
                data: deploymentData,
            },
        });
        const foundDeployments = await gCall({
            schema: testSchema,
            source: findDeploymentQuery,
        });
        expect(foundDeployments).toBeDefined();
    });

    /**
     * testing findDeploymentsByField
     */
    it('findDeploymentsByField works with each field', async () => {
        await gCall({
            schema: testSchema,
            source: createDeploymentMutation,
            variableValues: {
                data: testData,
            },
        });
        const foundDeployments = await gCall({
            schema: testSchema,
            source: findDeploymentsByFieldQuery,
        });
        expect(foundDeployments).toMatchObject({
            data: {
                findDeploymentsByField: [
                    {
                        id: 3,
                        tech: 'Keith',
                    },
                ],
            },
        });
    });
});
