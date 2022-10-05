import { defineStore } from "pinia";
import axios from "axios";

export const useMealsStore = defineStore("meals", {
  state: () => {
    return {
      meals: [],
      cart: [],
      orders: [],
      isLoading: true,
    };
  },
  actions: {
    clearCart() {
      this.cart = []
    },
    getOrders() {
      axios
        .get("http://localhost:3000/orders")
        .then((res) => {
          this.orders = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMeals() {
      axios
        .get("http://localhost:3000/meals")
        .then((res) => {
          this.meals = res.data;
          setTimeout(() => {
            this.isLoading = false
          }, 800)
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart(someObject) {
      if (this.cart.some((item) => item.name === someObject.name)) {
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].name == someObject.name) {
            this.cart[i].count++;
          }
        }
      } else {
        this.cart.push(someObject);
      }
    },
    deleteItemFromCart(name) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].name === name) {
          this.cart.splice(i, 1)
        }
      }
    }
  },
  getters: {
    getCartSize(state) {
      let size = 0;
      state.cart.forEach((item) => {
        size += item.count;
      })
      if (size > 9) {
        return "9+"
      }
      return size;
    },
    getCartPrice(state) {
      let price = 0;
      state.cart.forEach((item) => {
        price += item.price * item.count;
      });
      return price;
    },
    getCart(state) {
      return "Zzz"
    }
  },
});
