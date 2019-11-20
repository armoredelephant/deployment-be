import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloWorldResolver {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @Query(() => String)
  hello() {
    return 'hi!'
  }
}
