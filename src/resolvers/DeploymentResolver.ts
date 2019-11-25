import {
    Resolver,
    Arg,
    InputType,
    Field,
    Mutation,
    Query,
    ArgsType,
    Args,
    ObjectType,
} from 'type-graphql';
import { Deployment } from '../entity/Deployment';
import {
    EntityNotCreated,
    ResourceNotFound,
    InternalError,
} from '../utils/customErrors';

@InputType()
export class DeploymentInput {
    @Field()
    tech: string;

    @Field()
    endUser: string;

    @Field()
    product: string;

    @Field()
    modelType: string;

    @Field()
    serialNumber: string;

    @Field()
    timeStamp: string;
}

@ObjectType()
@ArgsType()
export class DeploymentArgsType {
    @Field({ nullable: true })
    tech?: string;

    @Field({ nullable: true })
    endUser?: string;

    @Field({ nullable: true })
    product?: string;

    @Field({ nullable: true })
    modelType?: string;

    @Field({ nullable: true })
    serialNumber?: string;

    @Field({ nullable: true })
    timeStamp?: string;
}

@Resolver()
export class DeploymentResolver {
    /**
     * mutation to create a deployment
     */
    @Mutation(() => Deployment)
    async createDeployment(
        @Arg('deployment', () => DeploymentInput)
        deployment: DeploymentInput
    ): Promise<Deployment | void> {
        let newDeployment;

        try {
            newDeployment = await Deployment.create(deployment).save();
        } catch (error) {
            throw new InternalError(error);
        }

        if (!newDeployment)
            throw new EntityNotCreated('deployment', { query: deployment });
        return newDeployment;
    }
    /**
     * query to find all deployments
     */
    @Query(() => [Deployment])
    async findDeployments(): Promise<Deployment[]> {
        try {
            return await Deployment.find();
        } catch (error) {
            throw new InternalError(error);
        }
    }
    /**
     * query for finding each tech by any field other than id
     */
    @Query(() => [Deployment])
    async findDeploymentsByField(
        @Args({ validate: false })
        {
            tech,
            endUser,
            product,
            modelType,
            serialNumber,
            timeStamp,
        }: DeploymentArgsType
    ): Promise<Deployment[] | undefined> {
        const options: DeploymentArgsType = {};

        if (tech) {
            options.tech = tech;
        }
        if (endUser) {
            options.endUser = endUser;
        }
        if (product) {
            options.product = product;
        }
        if (modelType) {
            options.modelType = modelType;
        }
        if (serialNumber) {
            options.serialNumber = serialNumber;
        }
        if (timeStamp) {
            options.timeStamp = timeStamp;
        }

        let deployment;

        try {
            deployment = await Deployment.find(options);
        } catch (error) {
            throw new InternalError(error);
        }

        if (deployment.length === 0)
            throw new ResourceNotFound('deployment', { query: options });

        return deployment;
    }
}
/**
 * for front-end:
 * const now = new Date()
 * const timeStamp = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`
 */
