import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Order } from "./order.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Product {
    @Field()
    @PrimaryColumn('int')
    id: number

    @Field()
    @Column('text')
    name: string

    @Field()
    @Column('text')
    slug: string

    @Field()
    @Column('int')
    price: number

    @Field()
    @Column('int')
    categoryId:number

    @Field(type => Category)
    @ManyToOne(() => Category, category => category.products, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    category: Category
}
