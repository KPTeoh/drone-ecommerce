import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto, Order } from './models/checkout.model';
export declare class CheckoutService {
    private readonly cartService;
    private readonly productsService;
    private orders;
    constructor(cartService: CartService, productsService: ProductsService);
    processCheckout(checkoutDto: CheckoutDto): Promise<Order>;
}
