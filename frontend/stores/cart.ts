import { defineStore } from 'pinia';
import type { Cart, CartItem, Product, ShippingInfo, CartState } from '~/types';

export const useCartStore = defineStore('cart', {
    state: (): CartState => {
        // Try to load initial state from localStorage
        const savedState = useNuxtApp().isClient ? localStorage.getItem('cartState') : null;
        return savedState ? JSON.parse(savedState) : {
            items: [],
            total: 0,
            error: null,
        };
    },

    getters: {
        cartItemCount: (state: CartState): number =>
            state.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
        cartTotal: (state: CartState): number =>
            state.items.reduce((sum: number, item: CartItem) => sum + (item.product.price * item.quantity), 0),
    },

    actions: {
        clearError() {
            this.error = null;
            this.saveState();
        },

        saveState() {
            if (useNuxtApp().isClient) {
                localStorage.setItem('cartState', JSON.stringify({
                    items: this.items,
                    total: this.total,
                    error: this.error,
                }));
            }
        },

        async initializeCart() {
            try {
                const config = useRuntimeConfig();
                const cart = await $fetch<Cart>(`${config.public.apiBaseUrl}/cart`);
                if (cart) {
                    this.items = cart.items;
                    this.total = cart.total;
                }
                this.error = null;
                this.saveState();
            } catch (error) {
                console.error('Failed to initialize cart:', error);
                this.error = 'Failed to load cart';
                this.saveState();
            }
        },

        async addToCart(product: Product, quantity: number = 1) {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBaseUrl}/cart`, {
                    method: 'POST',
                    body: { productId: product.id, quantity },
                });

                await this.initializeCart();
            } catch (error: any) {
                // Handle structured API error responses
                if (error.response && error.response._data) {
                    this.error = error.response._data.message || 'Failed to add item to cart';
                } else {
                    this.error = error.message || 'Failed to add item to cart';
                }
                this.saveState();
                throw error;
            }
        },

        async updateQuantity(cartItemId: string, quantity: number) {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBaseUrl}/cart/${cartItemId}`, {
                    method: 'PUT',
                    body: { quantity },
                });

                await this.initializeCart();
            } catch (error: any) {
                // Handle structured API error responses
                if (error.response && error.response._data) {
                    this.error = error.response._data.message || 'Failed to update quantity';
                } else {
                    this.error = error.message || 'Failed to update quantity';
                }
                this.saveState();
                throw error;
            }
        },

        async removeItem(cartItemId: string) {
            try {
                const config = useRuntimeConfig();
                await $fetch(`${config.public.apiBaseUrl}/cart/${cartItemId}`, {
                    method: 'DELETE',
                });

                await this.initializeCart();
            } catch (error: any) {
                console.error('Failed to remove item:', error);
                this.error = error.message || 'Failed to remove item';
                this.saveState();
                throw error;
            }
        },

        async checkout(shippingInfo: ShippingInfo): Promise<boolean> {
            try {
                const config = useRuntimeConfig();

                await $fetch(`${config.public.apiBaseUrl}/checkout`, {
                    method: 'POST',
                    body: {
                        shippingInfo,
                        items: this.items,
                        total: this.cartTotal,
                    },
                });

                // Clear client-side cart immediately
                this.items = [];
                this.total = 0;
                this.error = null;

                // Clear localStorage
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('cartState');
                }

                return true;
            } catch (error: any) {
                this.error = error.message || 'Failed to process checkout';
                this.saveState();
                throw error;
            }
        },
    },
});