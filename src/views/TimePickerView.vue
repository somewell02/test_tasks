<template>
  <base-layout>
    <prime-calendar v-model="time" date-format="HH:MM" timeOnly />
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import PrimeCalendar from "primevue/calendar";

import { ref } from "vue";

const getCurrentTime = () => {
  const date = new Date();

  const result = date.toLocaleTimeString("ru", {
    hour: "numeric",
    minute: "numeric",
  });

  return result.toString();
};

const time = ref<string>(getCurrentTime());
</script>
