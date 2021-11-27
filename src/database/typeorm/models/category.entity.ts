import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
@Entity()
export class Category {
    @Field()
    @PrimaryColumn('int')
    id: number

    @Field()
    @Column('text')
    name: string

    @Field()
    @Column('text')
    slug: string

    @Field(type => [Product])
    @OneToMany(() => Product, product => product.category)
    products: Product[];
}