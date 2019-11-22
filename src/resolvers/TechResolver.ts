import {
  Resolver,
  Mutation,
  Arg,
  //   InputType,
  ArgsType,
  Field,
  Int,
  Query,
  Args,
} from 'type-graphql'
import { Tech } from '../entity/Tech'

// @InputType()
// class TechInput implements Partial<Tech> {
//   @Field(() => Int, { nullable: true })
//   id?: number

//   @Field({ nullable: true })
//   name?: string
// }

@ArgsType()
class GetTechArgs {
  @Field(() => Int, { nullable: true })
  id?: number

  @Field({ nullable: true })
  name?: string
}

@Resolver()
export class TechResolver {
  @Mutation(() => Tech)
  async createTech(@Arg('name') name: string): Promise<Tech> {
    const createdTech = await Tech.create({ name }).save()
    return createdTech
  }

  @Query(() => [Tech])
  async getTech(
    @Args({ validate: false })
    { id, name }: GetTechArgs
  ): Promise<Tech[] | undefined> {
    let foundTech
    if (id) {
      foundTech = await Tech.find({ id })
    }
    if (name) {
      foundTech = await Tech.find({ name })
    }
    return foundTech
  }

  @Query(() => [Tech])
  async getAllTechs(): Promise<Tech[]> {
    return await Tech.find()
  }
}
