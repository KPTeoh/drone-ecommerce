import { Product } from './models/product.model';
export declare class ProductsService {
    private products;
    findAll(): Product[];
    findOne(id: string): Product;
    updateStock(productId: string, quantity: number): void;
}
