<template>
  <base-layout>
    <multi-select
      v-model="selectedCities"
      :options="cities"
      option-label="name"
      placeholder="Выберете города"
      :max-selected-labels="3"
      class="reset-select"
      filter
      reset-filter-on-hide
    >
      <template v-if="displaySelectedCities?.length" #value>
        <div class="reset-select__value">
          <div class="reset-select__value-items">
            {{ displaySelectedCities }}
          </div>
          <prime-button
            icon="pi pi-times"
            aria-label="Reset"
            size="small"
            severity="secondary"
            text
            rounded
            class="reset-select__value-reset-btn"
            @click.stop="resetSelectedItems"
          />
        </div>
      </template>
    </multi-select>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import MultiSelect from "primevue/multiselect";
import PrimeButton from "primevue/button";

import City from "@/types/reset-select/City";

import { computed, ref } from "vue";

const selectedCities = ref<City[]>();

const cities = ref<City[]>([
  { name: "Нью Йорк", code: "NY" },
  { name: "Рим", code: "RM" },
  { name: "Лондон", code: "LDN" },
  { name: "Стамбул", code: "IST" },
  { name: "Париж", code: "PRS" },
]);

const displaySelectedCities = computed(() =>
  selectedCities.value?.map((city) => city.name).join(", ")
);

const resetSelectedItems = () => {
  selectedCities.value = [];
};
</script>

<style lang="scss" scoped>
.reset-select {
  width: 100%;

  &__value {
    display: flex;
    align-items: center;

    &-items {
      flex-grow: 3;
    }

    &-reset-btn {
      width: 1.3rem;
      height: 1.3rem !important;
      padding: 0.2rem;
    }
  }
}
</style>
