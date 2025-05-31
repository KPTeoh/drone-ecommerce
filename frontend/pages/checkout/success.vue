<template>
  <div class="container mx-auto px-4 py-16 text-center">
    <div class="max-w-md mx-auto">

      <div v-if="cartStore.items.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🛒</div>
        <h1 class="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p class="text-gray-600 mb-8">
          We've received your order and will begin processing it right away.
          You'll receive a confirmation email shortly.
        </p>
      </div>

      <div class="space-y-4">
        <NuxtLink to="/"
          class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>