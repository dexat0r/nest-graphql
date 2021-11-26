import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from 'src/database/typeorm/models/product.entity';
import { ProductService } from './products.service';

@Resolver()
export class ProductResolver {

    constructor(private productService: ProductService ) {}

    @Query(() => [Product])
    public async products(): Promise<Product[]> {
        return await this.productService.getAllProducts();
    }

    @Query(() => Product)
    public async productBySlug(@Args('slug') slug: string): Promise<Product> {
        return await this.productService.getProductBySlug(slug);
    }
}
