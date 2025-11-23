import { ref, computed, onMounted } from "vue";
import { useApi } from "@/composables/useApi";

export function useProducts(autoLoad = true) {
  const { data, loading, error, request, cancelRequest } = useApi();

  const products = ref([]);
  const categories = ref([]);

  const searchTerm = ref("");
  const selectedCategoryId = ref("");

  const filteredProducts = computed(() => {
    let list = [...products.value];

    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategoryId.value) {
      const catId = Number(selectedCategoryId.value);
      list = list.filter((p) => p.categoryId === catId);
    }

    return list;
  });

  async function loadProducts() {
    const result = await request("/products", {}, { retry: true });
    products.value = result;
    return result;
  }

  async function loadCategories() {
    const result = await request("/categories", {}, { retry: true });
    categories.value = result;
    return result;
  }

  async function loadProductById(id) {
    return await request(`/products/${id}`, {}, { retry: true });
  }

  // CRUD (por si los usas en otra tarea)
  async function createProduct(product) {
    return await request("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  async function updateProduct(id, product) {
    return await request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  }

  async function deleteProduct(id) {
    return await request(`/products/${id}`, {
      method: "DELETE",
    });
  }

  if (autoLoad) {
    onMounted(async () => {
      try {
        await loadProducts();
        await loadCategories();
      } catch {
        // error ya queda en error.value
      }
    });
  }

  return {
    // estados base del useApi
    data,
    loading,
    error,
    cancelRequest,

    // datos específicos
    products,
    categories,
    searchTerm,
    selectedCategoryId,
    filteredProducts,

    // métodos
    loadProducts,
    loadCategories,
    loadProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
