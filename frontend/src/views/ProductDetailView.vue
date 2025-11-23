<template>
  <section v-if="loading">
    <p>Cargando producto...</p>
  </section>

  <section v-else-if="error">
    <p class="error">Error: {{ error }}</p>
  </section>

  <section v-else-if="product">
    <h2>{{ product.name }}</h2>
    <div class="detail">
      <img :src="product.imageUrl" :alt="product.name" />
      <div class="info">
        <p><strong>Precio:</strong> $ {{ product.price.toFixed(2) }}</p>
        <p><strong>Stock:</strong> {{ product.stock }}</p>
        <p><strong>Descripción:</strong> {{ product.description }}</p>
        <p><strong>Categoría ID:</strong> {{ product.categoryId }}</p>

        <div class="actions">
          <RouterLink :to="`/product/${product.id}/edit`">
            Editar producto
          </RouterLink>
          <RouterLink to="/">
           Volver al catálogo
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section v-else>
    <p>Producto no encontrado.</p>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useProducts } from "@/composables/useProducts";

const route = useRoute();
const { loading, error, loadProductById, cancelRequest } = useProducts(false);

const product = ref(null);

onMounted(async () => {
  try {
    const result = await loadProductById(route.params.id);
    product.value = result;
  } catch (err) {
    // error ya está en error.value, pero por si acaso:
    console.error(err);
  }
});

onUnmounted(() => {
  // demostramos cancelación opcional
  cancelRequest();
});
</script>


<style scoped>
.detail {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail img {
  max-width: 300px;
  width: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.actions {
  margin-top: 1rem;
}

.error {
  color: red;
}
</style>
