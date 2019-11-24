import { buildSchema } from 'type-graphql';
import { DeploymentResolver } from '../resolvers/DeploymentResolver';
import { TechResolver } from '../resolvers/TechResolver';
import { GraphQLSchema } from 'graphql';

export const createSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [DeploymentResolver, TechResolver],
    });
};
