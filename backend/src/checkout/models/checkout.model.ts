import { Cart } from '../../cart/models/cart.model';

export class ShippingInfo {
    name: string;
    email: string;
    address: string;
}

export class CheckoutDto {
    shippingInfo: ShippingInfo;
    items: Cart['items'];
    total: number;
}

export class Order {
    id: string;
    shippingInfo: ShippingInfo;
    items: Cart['items'];
    total: number;
    createdAt: Date;
}