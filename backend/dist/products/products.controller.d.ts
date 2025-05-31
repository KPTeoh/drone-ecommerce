import { ProductsService } from './products.service';
import { Product } from './models/product.model';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Product[];
    findOne(id: string): Product;
}
