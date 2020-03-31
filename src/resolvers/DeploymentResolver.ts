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
    ID,
    Int,
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
    techName: string;

    @Field()
    endUser: string;

    @Field()
    product: string;

    @Field()
    modelType: string;

    @Field()
    serialNumber: string;

    @Field()
    asset: string;

    @Field()
    timeStamp: string;

    @Field(() => Int)
    ticketNumber: number;

    @Field(() => ID)
    techId?: number;
}

@ObjectType()
@ArgsType()
export class DeploymentArgsType {
    @Field({ nullable: true })
    techName?: string;

    @Field({ nullable: true })
    endUser?: string;

    @Field({ nullable: true })
    product?: string;

    @Field({ nullable: true })
    modelType?: string;

    @Field({ nullable: true })
    serialNumber?: string;

    @Field({ nullable: true })
    asset?: string;

    @Field({ nullable: true })
    timeStamp?: string;

    @Field({ nullable: true })
    techId?: number;

    @Field({ nullable: true })
    ticketNumber?: number;
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
     * query for finding each techName by any field other than id
     */
    @Query(() => [Deployment])
    async findDeploymentsByField(
        @Args({ validate: false })
        {
            techName,
            endUser,
            product,
            modelType,
            serialNumber,
            asset,
            timeStamp,
            techId,
            ticketNumber,
        }: DeploymentArgsType
    ): Promise<Deployment[] | undefined> {
        const options: DeploymentArgsType = {};

        if (techName) {
            options.techName = techName;
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
        if (asset) {
            options.asset = asset;
        }
        if (timeStamp) {
            options.timeStamp = timeStamp;
        }
        if (techId) {
            options.techId = techId;
        }

        if (ticketNumber) {
            options.ticketNumber = ticketNumber;
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
