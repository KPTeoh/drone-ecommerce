import { Cart } from '../../cart/models/cart.model';
export declare class ShippingInfo {
    name: string;
    email: string;
    address: string;
}
export declare class CheckoutDto {
    shippingInfo: ShippingInfo;
    items: Cart['items'];
    total: number;
}
export declare class Order {
    id: string;
    shippingInfo: ShippingInfo;
    items: Cart['items'];
    total: number;
    createdAt: Date;
}
