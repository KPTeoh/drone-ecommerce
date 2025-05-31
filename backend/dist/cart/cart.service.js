"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../products/products.service");
const uuid_1 = require("uuid");
let CartService = class CartService {
    constructor(productsService) {
        this.productsService = productsService;
        this.cart = {
            items: [],
            total: 0,
        };
    }
    getCart() {
        return this.cart;
    }
    addToCart(productId, quantity) {
        const product = this.productsService.findOne(productId);
        if (quantity > product.stock) {
            throw new common_1.BadRequestException(`Cannot add ${quantity} items. Only ${product.stock} items available in stock.`);
        }
        const existingItem = this.cart.items.find(item => item.productId === productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (newQuantity > product.stock) {
                throw new common_1.BadRequestException(`Cannot add ${quantity} more items. Only ${product.stock - existingItem.quantity} items available.`);
            }
            existingItem.quantity = newQuantity;
        }
        else {
            const cartItem = {
                id: (0, uuid_1.v4)(),
                productId,
                quantity,
                product,
            };
            this.cart.items.push(cartItem);
        }
        this.updateCartTotal();
        return this.cart;
    }
    updateCartItem(itemId, quantity) {
        const item = this.cart.items.find(item => item.id === itemId);
        if (!item) {
            throw new common_1.NotFoundException(`Cart item with ID ${itemId} not found`);
        }
        const product = this.productsService.findOne(item.productId);
        if (quantity > product.stock) {
            throw new common_1.BadRequestException(`Cannot update to ${quantity} items. Only ${product.stock} items available in stock.`);
        }
        item.quantity = quantity;
        this.updateCartTotal();
        return this.cart;
    }
    removeCartItem(itemId) {
        const itemIndex = this.cart.items.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            throw new common_1.NotFoundException(`Cart item with ID ${itemId} not found`);
        }
        this.cart.items.splice(itemIndex, 1);
        this.updateCartTotal();
        return this.cart;
    }
    clearCart() {
        this.cart = {
            items: [],
            total: 0,
        };
        return this.cart;
    }
    updateCartTotal() {
        this.cart.total = this.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map