<template>
  <nav
    class="sticky top-0 z-50 w-full flex flex-wrap items-center justify-between py-3 bg-gradient-to-r from-cyan-300 to-cyan-700 border-b-2 border-black text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg"
  >
    <div
      class="container-fluid w-full flex flex-wrap items-center justify-between px-6"
    >
      <div class="container-fluid">
        <router-link
          class="test rounded p-1 transition ease-in-out duration-200 antialiased font-bold tracking-widest hover:text-gray-800 text-2xl font-brush text-black mr-4"
          to="/"
          >СушиУПетровича
        </router-link>
        <router-link
          class="transition ease-in-out duration-200 tracking-wider hover:text-cyan-800 antialiased text-xl font-oswald text-black mr-4"
          to="/menu"
          >Меню</router-link
        >
        <router-link
          class="transition ease-in-out duration-200 tracking-wider hover:text-cyan-800 antialiased text-xl font-oswald text-black"
          to="/about"
          >О компании</router-link
        >
      </div>
      <div class="container-fluid">
        <router-link to="/cart">
          <font-awesome-icon
            icon="fa-solid fa-cart-shopping"
            class="text-black text-xl"
          />
          <p
            class="absolute text-white border border-white rounded-full bg-black top-2 right-3 w-5 h-5 text-center flex items-center justify-center text-sm"
          >
            {{ store.getCartSize }}
          </p>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useMealsStore } from "../stores/counter";
const store = useMealsStore();
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald&family=Pacifico&display=swap');
@media (max-width: 450px) {
  .test {
    display: none;
  }
}
</style>
