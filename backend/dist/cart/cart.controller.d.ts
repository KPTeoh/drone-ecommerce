import { CartService } from './cart.service';
import { Cart } from './models/cart.model';
import { AddToCartDto, UpdateCartItemDto } from './models/cart.model';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(): Cart;
    addToCart(dto: AddToCartDto): Cart;
    updateCartItem(id: string, dto: UpdateCartItemDto): Cart;
    removeCartItem(id: string): Cart;
}
