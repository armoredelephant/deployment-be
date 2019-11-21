import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

/**
 * Could have done a separate GraphQLMovieType {} for the Query type
 * However, with @Field we can get a 2 for one by using the same layout
 * from this Movie class.
 * Basically getting a databse type and a graphQL type
 */

// for graphQL we decorate the class with OBjectType()
@ObjectType()
@Entity()
/**
 * extends BaseEntity was required in order to use Movie.insert()
 */
export class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  title: string

  // cannot infer number type
  @Field(() => Int)
  @Column('int', { default: 70 })
  minutes: number
}
