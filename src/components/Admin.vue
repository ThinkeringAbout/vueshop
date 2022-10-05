<template>
  <div v-if="this.currentUser == null" class="w-full flex items-center py-10">
    <Form
      @submit="adminLogin"
      class="border-2 border-black rounded-xl bg-gradient-to-r from-cyan-300 to-cyan-700 w-1/5 h-60 mx-auto flex justify-center flex-col"
    >
      <Field
        v-model="this.emailInput"
        class="w-2/3 my-2 mx-auto p-1 border-2 border-black rounded-xl"
        :rules="validate"
        name="email"
        placeholder="Login"
      ></Field>
      <Field
        v-model="this.passwordInput"
        type="password"
        class="w-2/3 my-2 mx-auto p-1 border-2 border-black rounded-xl"
        :rules="validate"
        name="password"
        placeholder="Password"
      ></Field>
      <button class="bg-white w-1/2 mx-auto mt-3 border-2 border-black rounded-xl">Log</button>
    </Form>
  </div>
  <div v-else class="mt-20 ">
    <Form v-if="this.adminMode == 'add'" @submit="addMealToDb" class="flex flex-col w-1/3 mx-auto">
      <label for="name" class="font-mono font-bold text-cyan-300"
        >Название:</label
      >
      <Field
        v-model="this.newMeal.name"
        :rules="validate"
        type="text"
        name="name"
        id="name"
        class="mb-3 border-2 border-black rounded-lg p-2"
      />
      <ErrorMessage name="name" class="text-red-500 font-bold" />
      <label for="desc" class="font-mono font-bold text-cyan-300"
        >Ингредиенты:</label
      >
      <Field
        v-model="this.newMeal.description"
        :rules="validate"
        type="text"
        name="desc"
        id="desc"
        class="mb-3 border-2 border-black rounded-lg p-2"
      />
      <ErrorMessage name="desc" class="text-red-500 font-bold" />
      <label for="price" class="font-mono font-bold text-cyan-300">Цена:</label>
      <Field
        v-model="this.newMeal.price"
        :rules="validate"
        type="text"
        name="price"
        id="price"
        class="mb-3 border-2 border-black rounded-lg p-2"
      />
      <ErrorMessage name="price" class="text-red-500 font-bold" />
      <label for="url" class="font-mono font-bold text-cyan-300"
        >URL картинки:</label
      >
      <Field
        v-model="this.newMeal.imgUrl"
        :rules="validate"
        type="text"
        name="url"
        id="url"
        class="mb-3 border-2 border-black rounded-lg p-2"
      />
      <ErrorMessage name="url" class="text-red-500 font-bold" />
      <button
        class="mt-4 border border-black bg-white rounded font-mono font-bold text-black"
      >
        Подтвердить
      </button>
    </Form>
    <div v-else class="h-full flex flex-col justify-center max-h-50 overflow-y-auto">
      <div v-for="(item, idx) in store.orders" :key="idx" class="flex p-2 flex-col mx-auto justify-start items-left border my-1 border-black bg-white w-2/3 h-30 min-h-20 ">
        <p class="text-left">Заказ на сумму: <span class="text-mono font-bold">{{ item.fullprice }} ₽</span></p>
        <ul v-for="meal in item.food" class="text-red-500 border border-black my-1">
          <li>Блюдо: {{ meal.name }} x {{ meal.count }}</li>
          <li>Итог: {{ meal.price * meal.count }} ₽</li>

        </ul>
        <p class="text-left">Оплата: {{ item.payment == 'cash' ? 'Наличные' : 'Картой' }}</p>
        <p class="text-left">Адрес: г.{{ item.city }}, ул.{{ item.street }}, кв.{{ item.building }}</p>
        <p class="text-left">Комментарии: {{ item.comments }}</p>
        <p class="text-left">Статус: {{ item.completed ? 'Завершен' : 'В работе' }} </p>
        <button @click="changeOrderStatus(item.id, idx)" class="border-2 border-black bg-green-500">Завершить</button>
      </div>
      
      
      
      
      
    </div>
    <fieldset class="flex flex-row justify-evenly w-1/2 mx-auto">
          <div class="flex">
            <Field
              type="radio"
              name="payment"
              value="add"
              id="add"
              v-model="this.adminMode"
            />
            <label for="add" class="font-mono font-bold text-cyan-300 mx-1">Добавление товара</label>
          </div>
          <div class="flex">
            <input
              type="radio"
              name="payment"
              value="orders"
              id="orders"
              v-model="this.adminMode"
              class= "accent-cyan-300"
            />
            <label for="orders" class="font-mono font-bold text-cyan-300 mx-1">Заказы</label>
          </div>
        </fieldset>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useMealsStore } from "../stores/counter";
import axios from 'axios';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBnTh7BQPnCEx_nyZkBxIqI88FbrBL2Z_k",
  authDomain: "foodshop-92b21.firebaseapp.com",
  projectId: "foodshop-92b21",
  storageBucket: "foodshop-92b21.appspot.com",
  messagingSenderId: "974919859807",
  appId: "1:974919859807:web:6969b9215c79b64104a5ea",
  measurementId: "G-E4EELXDFTN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export default {
  setup() {
    const store = useMealsStore();
    return { store };
  },
  name: "Admin",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      adminMode: "add",
      emailInput: "",
      passwordInput: "",
      currentUser: null,
      newMeal: {
        name: "",
        price: "",
        description: "",
        imgUrl: "",
      },
    };
  },
  mounted() {
    this.store.getOrders();
  },
  computed: {
    payment(text) {
      if (text === 'cash') {
        return 'Наличные'
      }
      return 'Картой'
    },
    isCompleted(value) {
      if (value) {
        return 'Завершен'
      }
      return 'В работе'
    }
  },
  methods: {
    changeOrderStatus(itemId, index) {
      const body = {
        id: itemId,
        completed: true
      }
      axios
        .post("https://shopbackend.onrender.com/updateorder", body)
        .then((res) => {
          console.log("Res:", res);
          this.store.orders[index].completed = true
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    },
    adminLogin() {
      signInWithEmailAndPassword(auth, this.emailInput, this.passwordInput)
        .then((userCredential) => {
          // Signed in
          this.currentUser = userCredential.user;
          alert("Logged in");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      this.emailInput = "";
      this.passwordInput = "";
    },
    validate(value) {
      if (!value.length) {
        return "Обязательно для заполнения";
      }
      return true;
    },
    addMealToDb() {
      const newDish = {
        name: this.newMeal.name,
        description: this.newMeal.description,
        price: this.newMeal.price,
        imgUrl: this.newMeal.imgUrl,
      };
      axios
        .post("https://shopbackend.onrender.com/addmeal", newDish)
        .then((res) => {
          console.log("Res:", res);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
      this.newMeal.name = "";
      this.newMeal.description = "";
      this.newMeal.price = "";
      this.newMeal.imgUrl = "";
    },
  },
};
</script>

<style></style>
