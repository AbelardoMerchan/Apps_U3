<template>
  <section>
    <h2>{{ isEdit ? "Editar producto" : "Nuevo producto" }}</h2>

    <div v-if="initialLoading" class="state">
      Cargando formulario...
    </div>

    <div v-else>
      <form @submit.prevent="onSubmit" class="form">
        <!-- Nombre -->
        <div class="field">
          <label for="name">Nombre</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
          />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>

        <!-- Descripción -->
        <div class="field">
          <label for="description">Descripción</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
          ></textarea>
        </div>

        <!-- Precio -->
        <div class="field">
          <label for="price">Precio</label>
          <input
            id="price"
            v-model="form.price"
            type="number"
            step="0.01"
            min="0"
          />
          <p v-if="errors.price" class="error">{{ errors.price }}</p>
        </div>

        <!-- Stock -->
        <div class="field">
          <label for="stock">Stock</label>
          <input
            id="stock"
            v-model="form.stock"
            type="number"
            step="1"
            min="0"
          />
          <p v-if="errors.stock" class="error">{{ errors.stock }}</p>
        </div>

        <!-- Categoría -->
        <div class="field">
          <label for="category">Categoría</label>
          <select
            id="category"
            v-model="form.categoryId"
          >
            <option value="">Seleccione una categoría</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
          <p v-if="errors.categoryId" class="error">{{ errors.categoryId }}</p>
        </div>

        <!-- URL de imagen -->
        <div class="field">
          <label for="imageUrl">URL de imagen</label>
          <input
            id="imageUrl"
            v-model="form.imageUrl"
            type="url"
          />
          <p v-if="errors.imageUrl" class="error">{{ errors.imageUrl }}</p>
        </div>

        <!-- Estado de error global API -->
        <p v-if="apiError" class="error">
          {{ apiError }}
        </p>

        <!-- Botones -->
        <div class="actions">
          <button type="submit" :disabled="submitting">
            {{ isEdit ? "Guardar cambios" : "Crear producto" }}
          </button>
          <RouterLink to="/">Cancelar</RouterLink>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "@/composables/useProducts";

const route = useRoute();
const router = useRouter();

// usamos el composable sin autoLoad (false)
const {
  categories,
  loadCategories,
  loadProductById,
  createProduct,
  updateProduct,
  error: apiErrorRef,
} = useProducts(false);

const isEdit = computed(() => !!route.params.id);

const form = reactive({
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
  imageUrl: "",
});

const errors = reactive({});
const initialLoading = ref(true);
const submitting = ref(false);
const apiError = ref("");

// cargar categorías y, si es edición, el producto
onMounted(async () => {
  try {
    await loadCategories();

    if (isEdit.value) {
      const data = await loadProductById(route.params.id);
      form.name = data.name;
      form.description = data.description;
      form.price = String(data.price);
      form.stock = String(data.stock);
      form.categoryId = data.categoryId;
      form.imageUrl = data.imageUrl;
    }
  } catch (err) {
    apiError.value = apiErrorRef.value || err.message || "Error al cargar datos";
  } finally {
    initialLoading.value = false;
  }
});

function validateForm() {
  // limpiar errores
  Object.keys(errors).forEach((k) => delete errors[k]);

  // nombre
  if (!form.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  // precio
  const priceNumber = Number(form.price);
  if (Number.isNaN(priceNumber)) {
    errors.price = "El precio debe ser numérico.";
  } else if (priceNumber <= 0) {
    errors.price = "El precio debe ser mayor a 0.";
  }

  // stock
  const stockNumber = Number(form.stock);
  if (Number.isNaN(stockNumber)) {
    errors.stock = "El stock debe ser numérico.";
  } else if (stockNumber < 0) {
    errors.stock = "El stock debe ser mayor o igual a 0.";
  }

  // categoría
  if (!form.categoryId) {
    errors.categoryId = "La categoría es obligatoria.";
  }

  // URL de imagen
  if (!form.imageUrl.trim()) {
    errors.imageUrl = "La URL de la imagen es obligatoria.";
  } else if (!/^https?:\/\/.+/.test(form.imageUrl.trim())) {
    errors.imageUrl = "La URL de la imagen debe iniciar con http:// o https://";
  }

  return Object.keys(errors).length === 0;
}

async function onSubmit() {
  apiError.value = "";

  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  const payload = {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    stock: Number(form.stock),
    categoryId: Number(form.categoryId),
    imageUrl: form.imageUrl.trim(),
  };

  try {
    let saved;

    if (isEdit.value) {
      saved = await updateProduct(route.params.id, payload);
    } else {
      saved = await createProduct(payload);
    }

    alert(isEdit.value ? "Producto actualizado" : "Producto creado");
    router.push(`/product/${saved.id}`);
  } catch (err) {
    apiError.value = apiErrorRef.value || err.message || "Error al guardar el producto";
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.form {
  max-width: 540px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field input,
.field textarea,
.field select {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #c0392b;
  font-size: 0.85rem;
}

.state {
  margin-top: 1.5rem;
}
</style>
