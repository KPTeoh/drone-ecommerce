import { Cart } from './models/cart.model';
import { ProductsService } from '../products/products.service';
export declare class CartService {
    private readonly productsService;
    private cart;
    constructor(productsService: ProductsService);
    getCart(): Cart;
    addToCart(productId: string, quantity: number): Cart;
    updateCartItem(itemId: string, quantity: number): Cart;
    removeCartItem(itemId: string): Cart;
    clearCart(): Cart;
    private updateCartTotal;
}
