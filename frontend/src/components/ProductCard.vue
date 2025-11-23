<template>
  <article class="card">
    <img
      class="card-image"
      :src="product.imageUrl"
      :alt="product.name"
    />
    <div class="card-body">
      <h3>{{ product.name }}</h3>
      <p class="price">$ {{ product.price.toFixed(2) }}</p>
      <p class="stock">Stock: {{ product.stock }}</p>
      <p class="desc">{{ product.description }}</p>

      <div class="card-actions">
        <RouterLink :to="`/product/${product.id}`">
          Ver detalles
        </RouterLink>
        <button @click="handleAdd">
          Añadir
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// evento personalizado added-to-cart
const emit = defineEmits(["added-to-cart"]);

function handleAdd() {
  emit("added-to-cart", props.product);
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-body {
  padding: 0.75rem;
}

.price {
  font-weight: bold;
}

.stock {
  font-size: 0.9rem;
  color: #555;
}

.desc {
  font-size: 0.9rem;
  margin: 0.3rem 0 0.6rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}
</style>
