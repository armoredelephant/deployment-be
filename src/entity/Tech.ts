import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany,
    Column,
} from 'typeorm';
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
    @Column({ nullable: false })
    name: string;

    @Field(() => [Deployment])
    @OneToMany(
        () => Deployment,
        deployment => deployment.tech
    )
    deployments: Promise<Deployment[]>;
}
