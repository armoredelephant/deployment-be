import { graphql, ExecutionResult, GraphQLSchema } from 'graphql';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import Maybe from 'graphql/tsutils/Maybe';

interface Options {
    schema: GraphQLSchema;
    source: string;
    variableValues?: Maybe<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }>;
}

export const gCall = async ({
    schema,
    source,
    variableValues,
}: Options): Promise<ExecutionResult<ExecutionResultDataDefault>> => {
    const results = await graphql({
        schema,
        source,
        variableValues,
    });
    const data = {
        errors: await results.errors,
        data: await results.data,
    };
    return data;
};
