import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Cart, CartItem } from './models/cart.model';
import { ProductsService } from '../products/products.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
    private cart: Cart = {
        items: [],
        total: 0,
    };

    constructor(private readonly productsService: ProductsService) { }

    getCart(): Cart {
        return this.cart;
    }

    addToCart(productId: string, quantity: number): Cart {
        const product = this.productsService.findOne(productId);

        // Validate quantity against stock
        if (quantity > product.stock) {
            throw new BadRequestException(`Cannot add ${quantity} items. Only ${product.stock} items available in stock.`);
        }

        // Check if item already exists in cart
        const existingItem = this.cart.items.find(item => item.productId === productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock) {
                throw new BadRequestException(`Cannot add ${quantity} more items. Only ${product.stock - existingItem.quantity} items available.`);
            }
            existingItem.quantity = newQuantity;
        } else {
            const cartItem: CartItem = {
                id: uuidv4(),
                productId,
                quantity,
                product,
            };
            this.cart.items.push(cartItem);
        }

        this.updateCartTotal();
        return this.cart;
    }

    updateCartItem(itemId: string, quantity: number): Cart {
        const item = this.cart.items.find(item => item.id === itemId);
        if (!item) {
            throw new NotFoundException(`Cart item with ID ${itemId} not found`);
        }

        // Validate quantity against stock
        const product = this.productsService.findOne(item.productId);
        if (quantity > product.stock) {
            throw new BadRequestException(`Cannot update to ${quantity} items. Only ${product.stock} items available in stock.`);
        }

        item.quantity = quantity;
        this.updateCartTotal();
        return this.cart;
    }

    removeCartItem(itemId: string): Cart {
        const itemIndex = this.cart.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            throw new NotFoundException(`Cart item with ID ${itemId} not found`);
        }

        this.cart.items.splice(itemIndex, 1);
        this.updateCartTotal();
        return this.cart;
    }

    clearCart(): Cart {
        this.cart = {
            items: [],
            total: 0,
        };
        return this.cart;
    }

    private updateCartTotal() {
        this.cart.total = this.cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0,
        );
    }
} 