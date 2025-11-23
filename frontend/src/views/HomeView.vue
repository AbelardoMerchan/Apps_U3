<template>
  <section>
    <h2>Catálogo de productos</h2>

    <!-- Barra de búsqueda + filtro por categoría -->
    <div class="toolbar">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="selectedCategoryId">
        <option value="">Todas las categorías</option>
        <option
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="state">
      Cargando productos...
    </div>

    <div v-else-if="error" class="state error">
      Ocurrió un error: {{ error }}
    </div>

    <div v-else-if="filteredProducts.length === 0" class="state">
      No se encontraron productos con los filtros actuales.
    </div>

    <!-- Lista filtrada usando ProductList -->
    <div v-else>
      <ProductList
        :products="filteredProducts"
        @added-to-cart="onAddedToCart"
      />
    </div>
  </section>
</template>

<script setup>
import ProductList from "@/components/ProductList.vue";
import { useProducts } from "@/composables/useProducts";
import { useCartStore } from "@/stores/cart";

const {
  categories,
  searchTerm,
  selectedCategoryId,
  filteredProducts,
  loading,
  error,
} = useProducts(true);

const cartStore = useCartStore();

function onAddedToCart(product) {
  cartStore.addItem(product);
  alert(`Producto añadido al carrito: ${product.name}`);
}
</script>

<style scoped>
/* puedes dejar tus estilos anteriores o estos */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.toolbar input,
.toolbar select {
  padding: 0.45rem 0.7rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  min-width: 220px;
}

.state {
  margin-top: 1.5rem;
  text-align: center;
}

.error {
  color: red;
}
</style>
