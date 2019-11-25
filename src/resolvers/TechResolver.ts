import {
    Resolver,
    Mutation,
    Arg,
    ArgsType,
    Field,
    Int,
    Query,
    Args,
    ObjectType,
    InputType,
} from 'type-graphql';
import { Tech } from '../entity/Tech';
import {
    InternalError,
    EntityNotCreated,
    ResourceNotFound,
} from '../utils/customErrors';

@InputType()
export class TechInput {
    @Field()
    name: string;
}

@ObjectType()
@ArgsType()
export class GetTechArgs {
    @Field(() => Int, { nullable: true })
    id?: number;

    @Field({ nullable: true })
    name?: string;
}

@ArgsType()
class RemoveTechArgs {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;
}

/**
 * Resolver for Tech
 * create / remove/ fetch single / fetch all
 */
@Resolver()
export class TechResolver {
    /**
     * mutation to create a tech
     */
    @Mutation(() => Tech)
    async createTech(@Arg('name') name: string): Promise<Tech> {
        let tech;

        try {
            tech = await Tech.create({ name }).save();
        } catch (error) {
            throw new InternalError(error);
        }

        if (!tech) throw new EntityNotCreated('tech', { query: { name } });
        return tech;
    }
    /**
     * mutation to delete a tech by name or id
     * will check if tech exists or fail
     */
    @Mutation(() => Boolean)
    async deleteTech(@Args() { id, name }: RemoveTechArgs): Promise<boolean> {
        try {
            await Tech.findOneOrFail({ id, name });
        } catch (error) {
            throw new ResourceNotFound('tech', { query: { name } });
        }

        try {
            await Tech.delete({ id, name });
            return true;
        } catch (error) {
            throw new InternalError(error);
        }
    }
    /**
     * mutation to update tech
     * will check if Tech exists first or fail
     */
    @Mutation(() => Boolean)
    async updateTech(
        @Arg('id', () => Int) id: number,
        @Arg('newName') newName: string
    ): Promise<boolean> {
        try {
            await Tech.findOneOrFail({ id });
        } catch (error) {
            throw new ResourceNotFound('tech');
        }

        try {
            await Tech.update({ id }, { name: newName });
            return true;
        } catch (error) {
            throw new InternalError(error);
        }
    }
    /**
     * query to find tech by name or id
     */
    @Query(() => [Tech])
    async findTech(
        @Args({ validate: false })
        { id, name }: GetTechArgs
    ): Promise<Tech[] | undefined> {
        const options: GetTechArgs = {};
        if (id) {
            options.id = id;
        }
        if (name) {
            options.name = name;
        }

        let tech;

        try {
            tech = await Tech.find(options);
        } catch (error) {
            throw new InternalError(error);
        }

        if (tech.length === 0)
            throw new ResourceNotFound('tech', { query: { id, name } });

        return tech;
    }

    /**
     * query to find all Techs in system
     */
    @Query(() => [Tech])
    async findAllTechs(): Promise<Tech[]> {
        try {
            return await Tech.find();
        } catch (error) {
            throw new InternalError(error);
        }
    }
}
