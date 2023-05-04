import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/link-field",
    name: "link-field",
    component: () => import("@/views/LinkFieldView.vue"),
  },
  {
    path: "/reset-select",
    name: "reset-select",
    component: () => import("@/views/ResetSelectView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
