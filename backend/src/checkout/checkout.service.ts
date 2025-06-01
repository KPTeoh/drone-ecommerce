import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto, Order } from './models/checkout.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CheckoutService {
    private orders: Order[] = [];

    constructor(
        private readonly cartService: CartService,
        private readonly productsService: ProductsService
    ) { }

    async processCheckout(checkoutDto: CheckoutDto): Promise<Order> {
        // Update stock for each item
        for (const item of checkoutDto.items) {
            this.productsService.updateStock(item.productId, item.quantity);
        }

        // Create a new order
        const order: Order = {
            id: uuidv4(),
            shippingInfo: checkoutDto.shippingInfo,
            items: checkoutDto.items,
            total: checkoutDto.total,
            createdAt: new Date(),
        };

        // Store the order
        this.orders.push(order);

        // Clear the cart
        this.cartService.clearCart();

        return order;
    }
}