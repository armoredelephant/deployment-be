import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Int, Field } from 'type-graphql'

/**
 * Our deployment entity
 * database type & graphQL type
 *
 * id
 * tech!
 * endUser!
 * product!
 * modelType!
 * serialNumber!
 */

@ObjectType()
@Entity()
export class Deployment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ nullable: false })
  tech: string

  @Field()
  @Column({ nullable: false })
  endUser: string

  @Field()
  @Column({ nullable: false })
  product: string

  @Field()
  @Column({ nullable: false })
  modelType: string

  @Field()
  @Column({ nullable: false })
  serialNumber: string
}
