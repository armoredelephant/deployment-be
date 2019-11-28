import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
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

    @OneToMany(
        () => Deployment,
        deployment => deployment.tech
    )
    deployments: Deployment[];
}

/**
 * OneToMany(() => Note, note => note.owner)
 * notes: Note[];
 */
