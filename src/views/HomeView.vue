<template>
  <base-layout>
    <div class="tasks-list">
      <prime-button
        v-for="task in tasks"
        :key="task.routeName"
        @click="$router.push({ name: task.routeName })"
      >
        {{ task.title }}
      </prime-button>
    </div>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import PrimeButton from "primevue/button";

import { ref } from "vue";

const tasks = ref([
  {
    title: "Поле Link",
    routeName: "link-field",
  },
  {
    title: "DateTime picker",
    routeName: "time-picker",
  },
  {
    title: "Сброс значений в Select",
    routeName: "reset-select",
  },
  {
    title: "Многострочный текст в ячейке",
    routeName: "api-text",
  },
  {
    title: "Таблица с поиском (расширенное задание)",
    routeName: "table-search",
  },
]);
</script>

<style lang="scss" scoped>
.tasks-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
