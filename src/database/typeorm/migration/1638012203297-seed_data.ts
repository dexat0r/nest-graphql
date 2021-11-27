import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Category } from "../models/category.entity";
import { Product } from "../models/product.entity";
import { categorySeed } from "../seeds/category.seed";
import { productsSeed } from "../seeds/product.seed";

export class seedData1638012203297 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        let productRep = getRepository('product');
        let categoryRep = getRepository('category');

        for (let category of categorySeed) {
            let newCategory = new Category();
            newCategory.id = Number(category.id);
            newCategory.name = category.name;
            newCategory.slug = category.slug

            await categoryRep.save(newCategory);
        }

        for (let product of productsSeed) {
            let newProduct = new Product();
            newProduct.id = Number(product.id);
            newProduct.name = product.name
            newProduct.price = Number(product.price)
            newProduct.slug = product.slug
            newProduct.categoryId = Number(product.category_id);

            await productRep.save(newProduct);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
