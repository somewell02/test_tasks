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
  {
    path: "/api-text",
    name: "/api-text",
    component: () => import("@/views/ApiTextView.vue"),
  },
  {
    path: "/table-search",
    name: "table-search",
    component: () => import("@/views/TableSearchView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
