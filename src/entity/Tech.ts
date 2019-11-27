import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { Deployment } from './Deployment';

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
    id: number;

    @Field()
    @OneToMany(
        () => Deployment,
        deployment => deployment.tech,
        { nullable: false }
    )
    name: string;
}
