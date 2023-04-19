import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { createRouter, createWebHistory } from "vue-router";
import MainApp from "./layouts/MainApp";
import ChosenApp from "./layouts/ChosenApp";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Main",
      component: MainApp,
    },
    {
      path: "/chosen",
      name: "Chosen",
      component: ChosenApp,
    },
    //   { path: '/login', name: 'Login', component: LoginPage },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
