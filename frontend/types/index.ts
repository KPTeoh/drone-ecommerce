export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    specifications: Record<string, string | number>;
    stock: number;
}

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}

export interface Cart {
    items: CartItem[];
    total: number;
}

export interface ShippingInfo {
    name: string;
    email: string;
    address: string;
}

export interface CartState {
    items: CartItem[];
    total: number;
    error: string | null;
}

