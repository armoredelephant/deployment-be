import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { ObjectType, Int, Field } from 'type-graphql';
import { Tech } from './Tech';

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
 * timeStamp!
 */

@ObjectType()
@Entity()
export class Deployment extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @ManyToOne(
        () => Tech,
        tech => tech.name
    )
    tech: string;

    @Field()
    @Column({ nullable: false })
    endUser: string;

    @Field()
    @Column({ nullable: false })
    product: string;

    @Field()
    @Column({ nullable: false })
    modelType: string;

    @Field()
    @Column({ nullable: false })
    serialNumber: string;

    @Field()
    @Column({ nullable: false })
    timeStamp: string;
}
