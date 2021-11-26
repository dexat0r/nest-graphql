import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field(type => String)
    @Column('text')
    @Unique(['email'])
    email: string

    @Field(type => String)
    @Column('text')
    password: string

    @Field(type => [Order], { nullable: true })
    @OneToMany(() => Order, order => order.user)
    orders: Order[]
}
