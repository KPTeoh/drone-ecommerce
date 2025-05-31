<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Checkout</h1>

        <!-- Error Message -->
        <div v-if="error" class="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ error }}
        </div>

        <!-- Display Succees Cart Message -->
        <div v-if="cartStore.items.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">🛒</div>
            <h1 class="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
            <p class="text-gray-600 mb-8">
                We've received your order and will begin processing it right away.
                You'll receive a confirmation email shortly.
            </p>
            <NuxtLink to="/"
                class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Shopping
            </NuxtLink>
        </div>

        <!-- Checkout Form (only show when cart has items) -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Shipping Form -->
            <form @submit.prevent="submitOrder" class="lg:col-span-2 space-y-6">
                <div class="border rounded-lg p-6">
                    <h2 class="text-xl font-semibold mb-6">Shipping Information</h2>

                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input v-model="form.name" type="text" required class="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter your full name" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input v-model="form.email" type="email" required class="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter your email address" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <textarea v-model="form.address" required class="w-full px-4 py-2 border rounded-lg"
                                rows="3" placeholder="Enter your shipping address"></textarea>
                        </div>
                    </div>
                </div>

                <button type="submit" :disabled="isSubmitting || cartStore.items.length === 0"
                    class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                    {{ isSubmitting ? 'Processing...' : 'Place Order' }}
                </button>

            </form>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
                <div class="border rounded-lg p-6 sticky top-4">
                    <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

                    <div class="space-y-4 mb-4">
                        <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between">
                            <span>
                                {{ item.product.name }}
                                <span class="text-gray-500">× {{ item.quantity }}</span>
                            </span>
                            <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                        </div>
                    </div>

                    <div class="border-t pt-4 space-y-2">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div class="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ShippingInfo } from '~/types';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const form = reactive<ShippingInfo>({
    name: '',
    email: '',
    address: '',
});

const submitOrder = async () => {
    try {
        error.value = null;
        isSubmitting.value = true;

        // Process checkout
        const success = await cartStore.checkout(form);

        if (success) {
            // Navigate to success page using Nuxt router
            await navigateTo('/checkout/success');
        } else {
            throw new Error('Checkout failed');
        }
    } catch (err: any) {
        error.value = err.message || 'Failed to process order. Please try again.';
        isSubmitting.value = false;
    }
};

// Initialize cart on checkout page (only if not already loaded)
onMounted(async () => {
    // Only initialize cart if it hasn't been loaded yet and we have localStorage data
    if (cartStore.items.length === 0 && typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cartState');
        if (savedCart) {
            // Only call API if we have saved cart state but no items loaded
            await cartStore.initializeCart();
        }
        // If no saved cart state, just leave cart empty - don't make API call
    }
});
</script>