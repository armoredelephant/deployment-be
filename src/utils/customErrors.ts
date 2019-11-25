import { TechInput, GetTechArgs } from '../resolvers/TechResolver';
import {
    DeploymentInput,
    DeploymentArgsType,
} from '../resolvers/DeploymentResolver';

/**
 * Query type is an InputType from one of the resolvers
 */
interface Query {
    query: DeploymentInput | TechInput | DeploymentArgsType | GetTechArgs;
}

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InternalError extends DatabaseError {
    data: Error;
    constructor(error: Error) {
        super(error.message);
        this.data = error;
    }
}

export class EntityNotCreated extends DatabaseError {
    data: { resource: string; query: Query };
    constructor(resource: string, query: Query) {
        super(`The ${resource} was not created in database.`);
        this.data = { resource, query };
    }
}

export class ResourceNotFound extends DatabaseError {
    data: { resource: string; query?: Query };
    constructor(resource: string, query?: Query) {
        super(`The ${resource} was not found in database.`);
        this.data = { resource, query };
    }
}
