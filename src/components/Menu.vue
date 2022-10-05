<template>
  <div v-if="store.isLoading" class="flex justify-center items-center mt-40">
    <div
      class="spinner-border animate-spin inline-block w-60 h-60 border-4 rounded-full"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-show="!store.isLoading" class="flex flex-row flex-wrap">
    <div class="mx-auto w-5/6 flex flex-wrap justify-center lg:justify-between">
      <div v-for="item in store.meals" :key="item.name" class="flex m-2">
        <div class="rounded-lg shadow-lg bg-black max-w-sm">
          <img
            class="rounded-t-lg h-3/5 w-full border-4 border-black"
            :src="item.imgUrl"
            alt="Sushi"
          />
          <div class="p-6 flex justify-between items-start flex-col h-auto">
            <h5 class="text-cyan-400 text-xl font-medium mb-2">
              {{ item.name }}
            </h5>
            <p class="text-cyan-800 text-base mb-4">
              {{ item.description }}
            </p>
            <div class="flex flex-row justify-between w-full items-baseline">
              <button
                type="button"
                @click="addItem(item)"
                class="inline-block align-bottom px-6 py-2.5 bg-cyan-400 text-black font-bold text-sm leading-tight rounded shadow-md hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                В корзину
              </button>
              <p class="text-white font-mono text-xl">{{ item.price }} ₽</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMealsStore } from "../stores/counter";
import { onMounted } from "vue";

const store = useMealsStore();
onMounted(store.getMeals);
const addItem = (item) => {
  const newItem = {
    name: item.name,
    price: item.price,
    count: 1,
  };
  store.addToCart(newItem);
};
</script>

<style></style>
