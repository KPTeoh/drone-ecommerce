import { Product } from '../../products/models/product.model';
export declare class CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}
export declare class Cart {
    items: CartItem[];
    total: number;
}
export declare class AddToCartDto {
    productId: string;
    quantity: number;
}
export declare class UpdateCartItemDto {
    quantity: number;
}
