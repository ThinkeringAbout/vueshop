<template>
  <div>
    <h2
      v-if="!store.getCartSize"
      class="w-1/3 mx-auto text-4xl text-center mt-10 font-mono font-bold text-cyan-300"
    >
      Корзина пуста... =(
    </h2>
    <div v-else>
      <h2 class="w-1/3 mx-auto text-3xl text-center mt-3 font-mono font-bold text-cyan-300">
        Проверьте Ваш заказ
      </h2>
      <TransitionGroup name="list">
        <div
          v-for="item in store.cart"
          :key="item.name"
          class="flex justify-start flex-row"
        >
          <div class="w-1/3 mx-auto flex mt-3 items-right">
            <div
              class="bg-white rounded-lg px-2 border border-black flex justify-between w-full font-mono font-bold text-black"
            >
              <p>{{ item.name }} : {{ item.price }} ₽</p>
              <p>x{{ item.count }}</p>
            </div>
            <button
              @click="deleteButton(item.name)"
              class="text-center flex justify-center ml-2 text-red-700 font-bold"
            >
              X
            </button>
          </div>
        </div>
      </TransitionGroup>
      <p class="w-1/3 mx-auto text-2xl text-right mt-3 font-mono font-bold text-cyan-300">
        Итог: {{ store.getCartPrice }} ₽
      </p>
      <Form @submit="submitOrder" class="flex flex-col w-1/3 mx-auto">
        <label for="city" class="font-mono font-bold text-cyan-300">Город:</label>
        <Field
          v-model="this.address.city"
          :rules="validate"
          type="text"
          name="city"
          id="city"
          class="mb-3 border-2 border-black rounded-lg p-2"
        />
        <ErrorMessage name="city" class="text-red-500 font-bold"/>
        <label for="street" class="font-mono font-bold text-cyan-300">Улица:</label>
        <Field
          v-model="this.address.street"
          :rules="validate"
          type="text"
          name="street"
          id="street"
          class="mb-3 border-2 border-black rounded-lg p-2"
        />
        <ErrorMessage name="street" class="text-red-500 font-bold"/>
        <label for="building" class="font-mono font-bold text-cyan-300">Квартира:</label>
        <Field
          v-model="this.address.building"
          :rules="validate"
          type="text"
          name="building"
          id="building"
          class="mb-3 border-2 border-black rounded-lg p-2"
        />
        <ErrorMessage name="building" class="text-red-500 font-bold"/>
        <fieldset class="flex flex-row justify-evenly">
          <div class="flex">
            <Field
              type="radio"
              name="payment"
              value="card"
              id="card"
              v-model="this.paymentMethod"
            />
            <label for="card" class="font-mono font-bold text-cyan-300 mx-1">Картой</label>
          </div>
          <div class="flex">
            <input
              type="radio"
              name="payment"
              value="cash"
              id="cash"
              v-model="this.paymentMethod"
              class= "accent-cyan-300"
            />
            <label for="cash" class="font-mono font-bold text-cyan-300 mx-1">Наличными</label>
          </div>
        </fieldset>
        <label for="comments" class="mt-3 font-mono font-bold text-cyan-300">Комментарии к заказу:</label>
        <textarea
          name="comments"
          id="comments"
          class="border-2 border-black rounded-lg p-2"
          maxlength="100"
          v-model="this.comments"
        ></textarea>
        <button
          class="mt-4 border border-black bg-white rounded font-mono font-bold text-black"
        >
          Подтвердить
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { useMealsStore } from "../stores/counter";
import axios from "axios";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { uid } from 'uid/single';

export default {
  setup() {
    const store = useMealsStore();
    return { store };
  },
  name: "Cart",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      address: {
        city: "",
        street: "",
        building: "",
      },
      paymentMethod: "cash",
      comments: "",
    };
  },
  methods: {
    validate(value) {
      if (!value.length) {
        return 'Обязательно для заполнения';
      }
      return true;
    },
    deleteButton(name) {
      this.store.deleteItemFromCart(name);
    },
    submitOrder() {
      const orderPrice = this.store.getCartPrice
      const order = {
        id: uid(),
        food: this.store.cart,
        city: this.address.city,
        street: this.address.street,
        building: this.address.building,
        payment: this.paymentMethod,
        comments: this.comments,
        fullprice: orderPrice,
        completed: false,
      };
      axios
        .post("https://shopbackend.onrender.com/order", order)
        .then((res) => {
          console.log("Res:", res);
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
      this.address.city = '';
      this.address.street = '';
      this.address.building = '';
      this.paymentMethod = 'cash';
      this.comments = '';
      this.store.clearCart();
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
