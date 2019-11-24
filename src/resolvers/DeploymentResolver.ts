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

@InputType()
class DeploymentInput {
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
class DeploymentArgsType {
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
        return await Deployment.create(deployment).save();
    }
    /**
     * query to find all deployments
     */
    @Query(() => [Deployment])
    async findDeployments(): Promise<Deployment[]> {
        return await Deployment.find();
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

        return await Deployment.find(options);
    }
}
/**
 * for front-end:
 * const now = new Date()
 * const timeStamp = `${now.getMonth()}-${now.getDate()}-${now.getFullYear()}`
 */
