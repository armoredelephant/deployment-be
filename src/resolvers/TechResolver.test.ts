import { Connection } from 'typeorm';
import { connect } from '../test-utils/testConnection';
import { gCall } from '../test-utils/gCall';
import { createSchema } from '../utils/createSchema';
import { GraphQLSchema } from 'graphql';
import {
    createTechMutation,
    deleteTechMutation,
    updateTechMutation,
} from '../test-utils/testMutations';
import { Tech } from '../entity/Tech';
import { findTechQuery, findAllTechsQuery } from '../test-utils/testQueries';

let testSchema: GraphQLSchema;
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

describe('Tech Resolver', () => {
    /**
     * testing if we can create a tech
     */
    describe('createTech mutation', () => {
        it('createTech creates a new tech', async () => {
            const response = await gCall({
                schema: testSchema,
                source: createTechMutation,
                variableValues: {
                    data: 'Salleena Yin',
                },
            });

            expect(response.data).toBeTruthy();
        });

        it('throws error', async () => {
            const response = await gCall({
                schema: testSchema,
                source: createTechMutation,
                variableValues: {
                    data: null,
                },
            });

            expect(response.errors).toBeTruthy();

            if (response.errors) {
                expect(response.errors.length).toBeGreaterThan(0);
            }
        });
    });
    /**
     * testing updateTech
     */
    describe('updateTech mutation', () => {
        it('updates a tech', async () => {
            const response = await gCall({
                schema: testSchema,
                source: updateTechMutation,
                variableValues: {
                    id: 1,
                    name: 'Brian Thomas',
                },
            });

            expect(response.data).toBeTruthy();

            if (response.data) {
                expect(response.data.updateTech).toBeTruthy();
            }

            const dbDeployment = await Tech.findOne({
                where: { name: 'Brian Thomas' },
            });

            expect(dbDeployment).toBeDefined();
        });
    });
    /**
     * testing findTech
     */
    describe('findTech query', () => {
        it('returns a tech', async () => {
            const response = await gCall({
                schema: testSchema,
                source: findTechQuery,
                variableValues: {
                    id: 1,
                    name: 'Brian Thomas',
                },
            });

            expect(response.data).toBeTruthy();

            if (response.data) {
                expect(response.data.findTech).toBeTruthy();
            }
        });

        it('returns errors if not found', async () => {
            const response = await gCall({
                schema: testSchema,
                source: findTechQuery,
                variableValues: {
                    id: 3,
                    name: 'Unknown Tech',
                },
            });

            expect(response.errors).toBeTruthy();

            if (response.errors) {
                expect(response.errors.length).toBeGreaterThan(0);
            }
        });
    });
    /**
     * testing findAllTechs
     */
    describe('findAllTechs query', () => {
        it('returns all techs', async () => {
            const response = await gCall({
                schema: testSchema,
                source: findAllTechsQuery,
            });
            expect(response.data).toBeTruthy();

            if (response.data) {
                expect(response.data.findAllTechs).toBeTruthy();
            }
        });
    });
    /**
     * testing deleteTech
     */
    describe('deleteTech mutation', () => {
        it('deleteTech deletes a tech', async () => {
            const response = await gCall({
                schema: testSchema,
                source: deleteTechMutation,
                variableValues: {
                    name: 'Brian Thomas',
                    id: 1,
                },
            });

            expect(response.data).toBeTruthy();

            if (response.data) {
                expect(response.data.deleteTech).toBeTruthy();
            }
        });

        it('deleteTech returns error if not found', async () => {
            const response = await gCall({
                schema: testSchema,
                source: deleteTechMutation,
                variableValues: {
                    name: 'Keith Alleman',
                    id: 2,
                },
            });
            expect(response.errors).toBeTruthy();

            if (response.errors) {
                expect(response.errors.length).toBeGreaterThan(0);
            }
        });
    });
});
