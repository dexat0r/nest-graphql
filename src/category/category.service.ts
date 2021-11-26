import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/database/typeorm/models/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    getAllCategories = async (): Promise<Category[]> => {
        let categories = await this.categoryRepository.find({relations: ["products"]});
        return categories;
    }

    getCategoryBySlug = async (slug: string): Promise<Category> => {
        let category = await this.categoryRepository.findOne({
            where: {
                slug: slug
            },
            relations: ["products"]
        });
        return category;
    }

}
