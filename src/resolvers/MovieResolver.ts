import {
  Resolver,
  Mutation,
  Arg,
  Query,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Movie } from '../entity/Movie'

// another method of defining args using an InputType

@InputType()
class MovieInput {
  @Field()
  title: string

  @Field(() => Int)
  minutes: number
}

// async createMovie(
//     @Arg('options', () => MovieInput) options: MovieInput,
//   ): Promise<boolean> {
//     await Movie.insert({ title, minutes })
//     return true
//   }

// creating a resolver
@Resolver()
// exporting class MovieResolver which will be passed into createSchema
export class MovieResolver {
  // creating a Mutation type and defining that it will return a boolean
  @Mutation(() => Movie)
  /**
   * The actual mutation function
   * Defining arg types with @Arg defined from type-graphql
   * 'title' is the name in the graphQL Schema
   * the () => String is the type in the graphql Schema
   * then we're defining the argument and it's type - title: string
   * then we define the return type, in this case boolean, but typically Promise.
   */
  // () => String could be inferred and is not actually required. (see 2nd arg)
  // Refactored to show () => Int instead since number will not be inferred.
  async createMovie(
    @Arg('title') title: string,
    @Arg('minutes', () => Int) minutes: number
  ): Promise<Movie> {
    // await Movie.insert({ title, minutes })
    const movie = await Movie.create({ title, minutes }).save()
    return movie
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => MovieInput) input: MovieInput
  ): Promise<boolean> {
    // first arg is id we want to update, followed by what we want to update with
    await Movie.update({ id }, input)
    return true
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Movie.delete({ id })
    return true
  }

  @Query(() => [Movie])
  async movies(): Promise<Movie[]> {
    return Movie.find()
  }
}
