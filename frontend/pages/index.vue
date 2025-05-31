<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Drone Components Catalog</h1>

        <!-- Search and Filter -->
        <div class="mb-8 flex flex-wrap gap-4">
            <input v-model="searchQuery" type="text" placeholder="Search products..."
                class="px-4 py-2 border rounded-lg flex-grow max-w-md" />
            <select v-model="selectedCategory" class="px-4 py-2 border rounded-lg">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>

        <!-- Loading State -->
        <div v-if="!products" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-xl text-gray-600">Loading products...</p>
        </div>

        <!-- Products Grid -->
        <div v-else-if="filteredProducts.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="product in filteredProducts" :key="product.id"
                class="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white">

                <!-- Product Image -->
                <div class="relative">
                    <img :src="product.imageUrl" :alt="product.name" class="w-full h-48 object-cover" />
                    <div v-if="product.stock === 0"
                        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span class="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>

                    <!-- Price and Stock -->
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-lg font-bold text-blue-600">${{ product.price.toFixed(2) }}</span>
                        <span :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
                            class="text-sm font-medium">
                            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                        </span>
                    </div>

                    <!-- Category Badge -->
                    <div class="mb-3">
                        <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {{ product.category }}
                        </span>
                    </div>

                    <!-- Action Button -->
                    <NuxtLink :to="`/product/${product.id}`"
                        class="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Details
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- No Products Found -->
        <div v-else class="text-center py-12">
            <div class="text-6xl mb-4">📦</div>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p class="text-gray-600 mb-4">No products match your search criteria.</p>
            <button @click="resetFilters"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Reset Filters
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types';

const searchQuery = ref('');
const selectedCategory = ref('');

// Get runtime config
const config = useRuntimeConfig()

// Fetch products
const { data: products } = await useFetch<Product[]>(`${config.public.apiBaseUrl}/products`);

// Extract unique categories
const categories = computed(() => {
    if (!products.value) return [];
    return [...new Set(products.value.map(p => p.category))].sort();
});

// Calculate in-stock count
const inStockCount = computed(() => {
    if (!products.value) return 0;
    return products.value.filter(p => p.stock > 0).length;
});

// Filter products based on search and category
const filteredProducts = computed(() => {
    if (!products.value) return [];

    return products.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value;

        return matchesSearch && matchesCategory;
    });
});

const resetFilters = () => {
    searchQuery.value = '';
    selectedCategory.value = '';
};
</script>