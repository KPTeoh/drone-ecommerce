import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto, Order } from './models/checkout.model';

@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) { }

    @Post()
    async checkout(@Body() checkoutDto: CheckoutDto): Promise<Order> {
        return this.checkoutService.processCheckout(checkoutDto);
    }
} 