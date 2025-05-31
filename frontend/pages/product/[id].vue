<template>
    <div class="container mx-auto px-4 py-8">

        <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Product Image -->
            <div class="rounded-lg overflow-hidden">
                <img :src="product.imageUrl" :alt="product.name" class="w-full h-auto object-cover" />
            </div>

            <!-- Product Details -->
            <div>
                <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
                <p class="text-gray-600 mb-6">{{ product.description }}</p>

                <div class="mb-6">
                    <span class="text-2xl font-bold">${{ product.price.toFixed(2) }}</span>
                    <span class="text-gray-500 ml-2">
                        {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                    </span>
                </div>

                <!-- Error Alert -->
                <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {{ error }}
                    <button @click="error = null" class="float-right font-bold">&times;</button>
                </div>

                <div class="flex items-center space-x-4">
                    <div class="flex items-center border rounded-lg">
                        <button @click="updateQuantity(-1)" class="px-4 py-2 hover:bg-gray-100"
                            :disabled="quantity <= 1">-</button>
                        <input type="number" v-model.number="quantity" min="1"
                            class="w-20 text-center px-2 py-2 border-x focus:outline-none" />
                        <button @click="updateQuantity(1)" class="px-4 py-2 hover:bg-gray-100"
                            :disabled="quantity >= product.stock">+</button>
                    </div>

                    <button @click="addToCart" :disabled="product.stock === 0 || isAddingToCart"
                        class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                        <span v-if="isAddingToCart">Adding to Cart...</span>
                        <span v-else>Add to Cart</span>
                    </button>
                </div>

                <!-- Specifications -->
                <div class="pt-6">
                    <h2 class="text-xl font-semibold mb-4">Specifications</h2>
                    <dl class="grid grid-cols-1 gap-4">
                        <template v-for="(value, key) in product.specifications" :key="key">
                            <div class="flex">
                                <dt class="font-medium text-gray-600 w-1/3">{{ key }}:</dt>
                                <dd class="text-gray-900">{{ value }}</dd>
                            </div>
                        </template>
                    </dl>
                </div>
            </div>
        </div>

        <div v-else class="text-center py-12">
            <p class="text-xl text-gray-600">Loading product details...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';
import { useCartStore } from '~/stores/cart';

const route = useRoute();
const cartStore = useCartStore();
const quantity = ref(1);
const isAddingToCart = ref(false);
const error = ref<string | null>(null);

// Get runtime config
const config = useRuntimeConfig()

// Fetch product details
const { data: product } = await useFetch<Product>(`${config.public.apiBaseUrl}/products/${route.params.id}`);

const updateQuantity = (change: number) => {
    if (!product.value) return;

    const newQuantity = quantity.value + change;
    if (newQuantity >= 1 && newQuantity <= product.value.stock) {
        quantity.value = newQuantity;
        error.value = null;
    }
};

const addToCart = async () => {
    if (isAddingToCart.value || !product.value) return;

    // Validate quantity before adding to cart
    if (quantity.value > product.value.stock) {
        error.value = `Cannot add ${quantity.value} units. Only ${product.value.stock} units available in stock.`;
        return;
    }

    // Ensure quantity is at least 1
    if (quantity.value < 1) {
        error.value = 'Quantity must be at least 1';
        return;
    }

    try {
        error.value = null;
        isAddingToCart.value = true;
        await cartStore.addToCart(product.value, quantity.value);
        // Reset quantity after successful add
        quantity.value = 1;
    } catch (err: any) {
        error.value = cartStore.error || 'Failed to add item to cart';
    } finally {
        isAddingToCart.value = false;
    }
};

// Clear any existing errors when component is mounted
onMounted(() => {
    cartStore.clearError();
});
</script>