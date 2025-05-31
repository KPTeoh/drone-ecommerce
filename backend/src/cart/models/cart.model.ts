import { Product } from '../../products/models/product.model';

export class CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}

export class Cart {
    items: CartItem[];
    total: number;
}

export class AddToCartDto {
    productId: string;
    quantity: number;
}

export class UpdateCartItemDto {
    quantity: number;
} 