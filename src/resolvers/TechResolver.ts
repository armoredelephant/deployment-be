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
} from 'type-graphql'
import { Tech } from '../entity/Tech'

@ObjectType()
@ArgsType()
class GetTechArgs {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field({ nullable: true })
  name?: string
}

@ArgsType()
class RemoveTechArgs {
  @Field(() => Int)
  id: number

  @Field()
  name: string
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
    const createdTech = await Tech.create({ name }).save()
    return createdTech
  }
  /**
   * mutation to delete a tech by name or id
   */
  @Mutation(() => Boolean)
  async deleteTech(@Args() { id, name }: RemoveTechArgs): Promise<boolean> {
    await Tech.delete({ id, name })
    return true
  }
  /**
   * mutation to update tech
   */
  @Mutation(() => Boolean)
  async updateTech(
    @Arg('id', () => Int) id: number,
    @Arg('newName') newName: string
  ): Promise<boolean> {
    const found = await Tech.findOne({ id })

    if (!found) {
      throw new Error('No tech was found with this id.')
    }

    await Tech.update({ id }, { name: newName })
    return true
  }
  /**
   * query to find tech by name or id
   */
  @Query(() => [Tech])
  async findTech(
    @Args({ validate: false })
    { id, name }: GetTechArgs
  ): Promise<Tech[] | undefined> {
    const options: GetTechArgs = {}
    if (id) {
      options.id = id
    }
    if (name) {
      options.name = name
    }
    return await Tech.find(options)
  }

  /**
   * query to find all Techs in system
   */
  @Query(() => [Tech])
  async findAllTechs(): Promise<Tech[]> {
    return await Tech.find()
  }
}
