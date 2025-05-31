import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './models/cart.model';
import { AddToCartDto, UpdateCartItemDto } from './models/cart.model';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getCart(): Cart {
        return this.cartService.getCart();
    }

    @Post()
    addToCart(@Body() dto: AddToCartDto): Cart {
        return this.cartService.addToCart(dto.productId, dto.quantity);
    }

    @Put(':id')
    updateCartItem(
        @Param('id') id: string,
        @Body() dto: UpdateCartItemDto,
    ): Cart {
        return this.cartService.updateCartItem(id, dto.quantity);
    }

    @Delete(':id')
    removeCartItem(@Param('id') id: string): Cart {
        return this.cartService.removeCartItem(id);
    }
} 