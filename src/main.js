import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { createRouter, createWebHistory } from "vue-router";
import MainApp from "./layouts/MainApp";
import FavoritesApp from "./layouts/FavoritesApp";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainApp,
    },
    {
      path: "/favorites",
      component: FavoritesApp,
    },
    //   { path: '/login', name: 'Login', component: LoginPage },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
