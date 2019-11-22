import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'

/**
 * Tech Entity
 * database type & graphQL type
 *
 * name!
 */

@ObjectType()
@Entity()
export class Tech extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ nullable: false })
  name: string
}
