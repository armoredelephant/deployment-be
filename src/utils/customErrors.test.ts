import {
    DatabaseError,
    InternalError,
    EntityNotCreated,
    ResourceNotFound,
} from './customErrors';
import { TechInput } from 'src/resolvers/TechResolver';

describe('customErrors', () => {
    it('DatabaseError works', () => {
        const error = new DatabaseError('test');
        expect(error).toBeDefined();
        expect(error.message).toEqual('test');
    });

    it('InternalError works', () => {
        const serverError = new Error('test');
        const error = new InternalError(serverError);
        expect(error).toBeDefined();
        expect(error.message).toEqual('test');
    });

    it('EntityNotCreated works', () => {
        const newQuery: TechInput = {
            name: 'keith',
        };
        const error = new EntityNotCreated('test', { query: newQuery });
        expect(error).toBeDefined();
        expect(error.message).toEqual('The test was not created in database.');
    });

    it('ResourceNotFound works', () => {
        const newQuery: TechInput = {
            name: 'keith',
        };
        const error = new ResourceNotFound('test', { query: newQuery });
        expect(error).toBeDefined();
        expect(error.message).toEqual('The test was not found in database.');
    });
});
