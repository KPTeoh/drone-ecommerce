<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold">Shopping Cart</h1>
            <NuxtLink to="/"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                Continue Shopping
            </NuxtLink>
        </div>

        <!-- Error Message -->
        <div v-if="cartStore.error" class="mb-8 p-4 bg-red-100 text-red-700 rounded-lg">
            {{ cartStore.error }}
        </div>

        <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Items -->
            <div class="lg:col-span-2">
                <div class="space-y-4">
                    <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 p-4 border rounded-lg">
                        <img :src="item.product.imageUrl" :alt="item.product.name"
                            class="w-24 h-24 object-cover rounded" />

                        <div class="flex-grow">
                            <h3 class="text-lg font-semibold">{{ item.product.name }}</h3>
                            <p class="text-gray-600">${{ item.product.price.toFixed(2) }}</p>

                            <div class="flex items-center gap-4 mt-2">
                                <div class="flex items-center border rounded">
                                    <button @click="updateQuantity(item.id, item.quantity - 1)"
                                        class="px-3 py-1 hover:bg-gray-100"
                                        :disabled="item.quantity <= 1 || isUpdating">
                                        -
                                    </button>
                                    <span class="px-3 py-1">{{ item.quantity }}</span>
                                    <button @click="updateQuantity(item.id, item.quantity + 1)"
                                        class="px-3 py-1 hover:bg-gray-100"
                                        :disabled="item.quantity >= item.product.stock || isUpdating">
                                        +
                                    </button>
                                </div>
                                <button @click="removeItem(item.id)" :disabled="isUpdating"
                                    class="text-red-600 hover:text-red-700 disabled:text-red-300">
                                    Remove
                                </button>
                            </div>
                        </div>

                        <div class="text-right">
                            <p class="font-semibold">
                                ${{ (item.product.price * item.quantity).toFixed(2) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
                <div class="border rounded-lg p-6 sticky top-4">
                    <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

                    <div class="space-y-2 mb-4">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>

                    <div class="border-t pt-4 mb-6">
                        <div class="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${{ cartStore.cartTotal.toFixed(2) }}</span>
                        </div>
                    </div>

                    <NuxtLink to="/checkout"
                        class="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Proceed to Checkout
                    </NuxtLink>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <p class="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <NuxtLink to="/"
                class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Shopping
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const isUpdating = ref(false);

// Initialize cart on page load
onMounted(() => {
    cartStore.initializeCart();
    cartStore.clearError();
});

const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
        isUpdating.value = true;
        await cartStore.updateQuantity(itemId, newQuantity);
    } catch (error) {
        // Error is already handled by the store
        console.error('Failed to update quantity:', error);
    } finally {
        isUpdating.value = false;
    }
};

const removeItem = async (itemId: string) => {
    try {
        isUpdating.value = true;
        await cartStore.removeItem(itemId);
    } catch (error) {
        // Error is already handled by the store
        console.error('Failed to remove item:', error);
    } finally {
        isUpdating.value = false;
    }
};
</script>