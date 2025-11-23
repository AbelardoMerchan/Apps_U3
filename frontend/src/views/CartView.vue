<template>
  <section>
    <h2>Carrito de compras</h2>

    <p v-if="items.length === 0">
      Tu carrito está vacío.
    </p>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="cell-product">
              <img :src="item.imageUrl" :alt="item.name" />
              <span>{{ item.name }}</span>
            </td>
            <td>$ {{ item.price.toFixed(2) }}</td>
            <td>
              <button @click="decrease(item)">-</button>
              <span class="qty">{{ item.quantity }}</span>
              <button @click="increase(item)">+</button>
            </td>
            <td>$ {{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button class="link" @click="remove(item)">
                Quitar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <p>Total items: {{ totalItems }}</p>
        <p class="total">Total a pagar: $ {{ totalAmount.toFixed(2) }}</p>
        <button @click="clear">Vaciar carrito</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();

const items = computed(() => cart.items);
const totalItems = computed(() => cart.totalItems);
const totalAmount = computed(() => cart.totalAmount);

function increase(item) {
  cart.addItem(item); // usa id, name, price, imageUrl, quantity++
}

function decrease(item) {
  cart.removeOne(item.id);
}

function remove(item) {
  cart.removeItem(item.id);
}

function clear() {
  if (confirm("¿Vaciar carrito?")) {
    cart.clearCart();
  }
}
</script>

<style scoped>
.cart-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.cart-table th,
.cart-table td {
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem;
  text-align: left;
}

.cell-product {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cell-product img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}

.qty {
  display: inline-block;
  min-width: 24px;
  text-align: center;
}

button {
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
}

button.link {
  background: transparent;
  border: none;
  color: #c0392b;
  cursor: pointer;
}

.summary {
  margin-top: 1rem;
  text-align: right;
}

.total {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
