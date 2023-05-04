<template>
  <base-layout>
    <data-table :value="items" tableStyle="min-width: 50rem">
      <prime-column field="time" header="Время"></prime-column>
      <prime-column field="comment" header="Комментарий"></prime-column>
    </data-table>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import DataTable from "primevue/datatable";
import PrimeColumn from "primevue/column";

import { getApiText } from "@/data/api-text/apiText";
import Item from "@/types/api-text/Item";

import { onMounted, ref } from "vue";

const items = ref<Item[]>([]);

const parseMultiLine = (str: string, separator: string): string[] => {
  const re = new RegExp(`(?=\\${separator})`);
  return str.split(re);
};

onMounted(() => {
  getApiText().then((res: string) => {
    const lines = parseMultiLine(res, "[");
    items.value = lines.map((line) => {
      const [time, ...comment] = line.split(" ");
      return {
        time,
        comment: comment.join(" "),
      };
    });
  });
});
</script>
