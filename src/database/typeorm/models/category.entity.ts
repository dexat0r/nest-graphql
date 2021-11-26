import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@ObjectType()
@Entity()
export class Category {
    @Field()
    @PrimaryGeneratedColumn()
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