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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("../cart/cart.service");
const products_service_1 = require("../products/products.service");
const uuid_1 = require("uuid");
let CheckoutService = class CheckoutService {
    constructor(cartService, productsService) {
        this.cartService = cartService;
        this.productsService = productsService;
        this.orders = [];
    }
    async processCheckout(checkoutDto) {
        for (const item of checkoutDto.items) {
            this.productsService.updateStock(item.productId, item.quantity);
        }
        const order = {
            id: (0, uuid_1.v4)(),
            shippingInfo: checkoutDto.shippingInfo,
            items: checkoutDto.items,
            total: checkoutDto.total,
            createdAt: new Date(),
        };
        this.orders.push(order);
        this.cartService.clearCart();
        return order;
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_service_1.CartService,
        products_service_1.ProductsService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map