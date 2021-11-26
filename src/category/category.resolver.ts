import { Args, Query, Resolver } from '@nestjs/graphql';
import { Category } from 'src/database/typeorm/models/category.entity';
import { CategoryService } from './category.service';

@Resolver()
export class CategoryResolver {

    constructor(private categoryService: CategoryService) {}

    @Query(() => [Category])
    public async categories(): Promise<Category[]> {
        return await this.categoryService.getAllCategories();
    }

    @Query(() => Category)
    public async categoryBySlug(@Args('slug') slug: string): Promise<Category> {
        return await this.categoryService.getCategoryBySlug(slug);
    }

}
