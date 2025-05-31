<template>
    <div class="min-h-screen flex flex-col">
        <!-- Navigation Header -->
        <header class="bg-white shadow-sm">
            <div class="container mx-auto px-4">
                <nav class="flex items-center justify-between h-16">
                    <NuxtLink to="/" class="text-xl font-bold text-blue-600">
                        Pola Corp
                    </NuxtLink>

                    <div class="flex items-center space-x-4">
                        <NuxtLink to="/" class="text-gray-600 hover:text-gray-900" active-class="text-blue-600">
                            Products
                        </NuxtLink>

                        <NuxtLink to="/cart" class="flex items-center text-gray-600 hover:text-gray-900"
                            active-class="text-blue-600">
                            <span>Cart</span>
                            <div class="relative">
                                <span v-if="cartStore.cartItemCount > 0"
                                    class="absolute -top-2 -right-6 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {{ cartStore.cartItemCount }}
                                </span>
                            </div>
                        </NuxtLink>
                    </div>
                </nav>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-grow">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-gray-50 border-t">
            <div class="container mx-auto px-4 py-8">
                <p class="text-center text-gray-600">
                    © {{ new Date().getFullYear() }} Pola Corp. All rights reserved.
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

// Initialize cart when the app starts (except on success page)
onMounted(() => {
    const route = useRoute();
    if (route.path !== '/checkout/success') {
        cartStore.initializeCart();
    }
});
</script>