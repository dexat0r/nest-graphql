import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Order {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field(type => [Int])
    @Column("int", {array: true})
    productsId: number[];

    @Field(type => User)
    @ManyToOne(() => User, user => user.orders)
    user: User;
}
