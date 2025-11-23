// src/stores/cart.js
import { defineStore } from "pinia";

const STORAGE_KEY = "mercapp_cart";

export const useCartStore = defineStore("cart", {
  state: () => {
    let saved = [];
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          saved = JSON.parse(raw);
        }
      } catch {
        saved = [];
      }
    }
    return {
      // [{ id, name, price, imageUrl, quantity }]
      items: saved,
    };
  },

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalAmount: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    quantityById: (state) => {
      return (productId) => {
        const item = state.items.find((i) => i.id === productId);
        return item ? item.quantity : 0;
      };
    },
  },

  actions: {
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      }
      this.persist();
    },

    removeOne(productId) {
      const index = this.items.findIndex((i) => i.id === productId);
      if (index === -1) return;

      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
      this.persist();
    },

    removeItem(productId) {
      this.items = this.items.filter((i) => i.id !== productId);
      this.persist();
    },

    clearCart() {
      this.items = [];
      this.persist();
    },

    persist() {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(this.items)
        );
      }
    },
  },
});
