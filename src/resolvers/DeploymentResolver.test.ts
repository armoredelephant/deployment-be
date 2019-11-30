import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import {
    createDeploymentMutation,
    createTechMutation,
} from '../test-utils/testMutations';
import { createSchema } from '../utils/createSchema';
import { GraphQLSchema } from 'graphql';
import faker from 'faker';
import { Deployment } from '../entity/Deployment';
import {
    findDeploymentQuery,
    findDeploymentsByFieldQuery,
} from '../test-utils/testQueries';

let testSchema: GraphQLSchema;

const invalidDeploymentData = {
    techName: faker.name.firstName(),
    endUser: faker.name.firstName(),
    product: faker.name.firstName(),
    modelType: faker.name.firstName(),
    serialNumber: faker.name.firstName(),
};

const deploymentData = {
    techName: 'Keith Alleman',
    endUser: 'Salleena',
    product: 'Test',
    modelType: 'Test',
    serialNumber: 'Test',
    timeStamp: 'Test',
    techId: 1,
};

let conn: Connection;

beforeAll(async () => {
    try {
        conn = await connect();
        testSchema = await createSchema();
    } finally {
        await gCall({
            schema: testSchema,
            source: createTechMutation,
            variableValues: {
                data: 'Keith Alleman',
            },
        });
    }
});
afterAll(async () => {
    await conn.dropDatabase();
    await conn.close();
});

describe('Deployment Resolver', () => {
    /**
     * testing if we can create a deployment in db
     */
    describe('createDeployment mutation', () => {
        it('create deployment', async () => {
            const response = await gCall({
                schema: testSchema,
                source: createDeploymentMutation,
                variableValues: {
                    data: deploymentData,
                },
            });

            expect(response.data).toBeTruthy();

            const dbDeployment = await Deployment.findOne({
                where: { techName: deploymentData.techName },
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

            expect(results.errors).toBeTruthy();

            if (results.errors) {
                expect(results.errors.length).toBeGreaterThan(0);
            }
        });
    });
    /**
     * testing findDeployment
     */
    describe('findDeployment query', () => {
        it('findDeployment returns query', async () => {
            const foundDeployments = await gCall({
                schema: testSchema,
                source: findDeploymentQuery,
            });

            expect(foundDeployments).toBeDefined();
        });
    });
    /**
     * testing findDeploymentsByField
     */
    describe('findDeploymentsByField query', () => {
        it('findDeploymentsByField works with each field', async () => {
            const foundDeployments = await gCall({
                schema: testSchema,
                source: findDeploymentsByFieldQuery,
            });

            expect(foundDeployments.data).toBeTruthy();
        });
    });
});
