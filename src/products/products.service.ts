import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/typeorm/models/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly categoryRepository: Repository<Product>
    ) {}

    getAllProducts = async ():Promise<Product[]> => {
        return await this.categoryRepository.find({relations: ["category"]});
    }

    getProductBySlug = async (slug: string): Promise<Product> => {
        return await this.categoryRepository.findOne({
            where: {
                slug: slug
            }
        });
    }

    
}


