import { createRouter, createWebHistory } from "vue-router";
import Menu from "../components/Menu.vue";
import About from "../components/About.vue";
import Cart from "../components/Cart.vue";
import Admin from "../components/Admin.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: (to) => {
        return { path: "/menu" };
      },
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: (to) => {
        return { path: "/about" };
      },
    },
  ],
});

export default router;
