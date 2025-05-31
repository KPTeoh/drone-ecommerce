import { CheckoutService } from './checkout.service';
import { CheckoutDto, Order } from './models/checkout.model';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    checkout(checkoutDto: CheckoutDto): Promise<Order>;
}
