import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CartModule } from '../cart/cart.module';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [CartModule, ProductsModule],
    controllers: [CheckoutController],
    providers: [CheckoutService],
})
export class CheckoutModule { }