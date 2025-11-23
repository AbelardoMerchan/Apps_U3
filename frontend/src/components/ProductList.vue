<template>
  <div class="grid">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
      @added-to-cart="(product) => $emit('added-to-cart', product)"
    />
  </div>
</template>

<script setup>
import ProductCard from "@/components/ProductCard.vue";

defineProps({
  products: {
    type: Array,
    default: () => [],
  },
});

// vuelve a emitir el mismo evento al padre
defineEmits(["added-to-cart"]);
</script>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
</style>
