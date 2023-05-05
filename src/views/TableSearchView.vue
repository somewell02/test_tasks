<template>
  <base-layout>
    <data-table
      :value="products"
      v-model:selection="selectedProducts"
      data-key="id"
      :paginator="true"
      :rows="10"
      :rows-per-page-options="[5, 10, 25]"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="Showing {first} to {last} of {totalRecords} products"
      class="table-search"
    >
      <template #header>
        <div class="table-search__header">
          <div class="table-search__header-search p-inputgroup flex-1">
            <multi-select
              v-model="columnsForSearch"
              :options="columns"
              option-label="name"
              placeholder="Поля таблицы"
              :max-selected-labels="2"
            >
              <template #dropdownicon>
                <i class="pi pi-sliders-v" style="color: white" />
              </template>
            </multi-select>
            <div class="table-search__header-search__field">
              <prime-button
                v-if="search"
                icon="pi pi-times"
                aria-label="Reset"
                size="small"
                severity="secondary"
                text
                rounded
                class="table-search__header-search__close-icon"
                @click.stop="resetSearchValue"
              />
              <input-text
                v-model="search"
                placeholder="Поиск..."
                @keydown.enter="searchProducts"
              />
            </div>
            <prime-button label="Search" @click="searchProducts" />
          </div>
          <div class="table-search__header-fields">
            <multi-select
              v-model="displayedColumns"
              :options="columns"
              option-label="name"
              placeholder="Поля таблицы"
              :max-selected-labels="2"
            />
          </div>
        </div>
      </template>

      <prime-column
        selection-mode="multiple"
        style="width: 3rem"
        :exportable="false"
      />
      <prime-column
        v-if="displayColumn('code')"
        field="code"
        header="Code"
        :sortable="true"
        style="min-width: 10rem"
      />
      <prime-column
        v-if="displayColumn('name')"
        field="name"
        header="Name"
        :sortable="true"
        style="min-width: 14rem"
      />
      <prime-column v-if="displayColumn('image')" header="Image">
        <template #body="slotProps">
          <img
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="table-search__img"
          />
        </template>
      </prime-column>
      <prime-column
        v-if="displayColumn('price')"
        field="price"
        header="Price"
        :sortable="true"
        style="min-width: 8rem"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </prime-column>
      <prime-column
        v-if="displayColumn('category')"
        field="category"
        header="Category"
        :sortable="true"
        style="min-width: 10rem"
      />
      <prime-column
        v-if="displayColumn('rating')"
        field="rating"
        header="Reviews"
        :sortable="true"
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          <prime-rating
            :model-value="slotProps.data.rating"
            :readonly="true"
            :cancel="false"
          />
        </template>
      </prime-column>
      <prime-column
        v-if="displayColumn('inventoryStatus')"
        field="inventoryStatus"
        header="Status"
        :sortable="true"
        style="min-width: 10rem"
      >
        <template #body="slotProps">
          <prime-tag
            :value="slotProps.data.inventoryStatus"
            :severity="getStatusLabel(slotProps.data.inventoryStatus)"
          />
        </template>
      </prime-column>
    </data-table>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import DataTable from "primevue/datatable";
import PrimeColumn from "primevue/column";
import PrimeRating from "primevue/rating";
import PrimeTag from "primevue/tag";
import MultiSelect from "primevue/multiselect";
import InputText from "primevue/inputtext";
import PrimeButton from "primevue/button";

import Product from "@/types/table-search/Product";
import {
  getAllProducts,
  getSearchedProducts,
} from "@/data/table-search/productsApi";

import { ref, onMounted } from "vue";
import TableColumn from "@/types/table-search/TableColumn";

const products = ref<Product[]>([]);
const selectedProducts = ref<Product[]>([]);

const columns = ref<TableColumn[]>([
  { name: "Code", code: "code" },
  { name: "Name", code: "name" },
  { name: "Image", code: "image" },
  { name: "Price", code: "price" },
  { name: "Category", code: "category" },
  { name: "Reviews", code: "rating" },
  { name: "Status", code: "inventoryStatus" },
]);

const displayedColumns = ref<TableColumn[]>([...columns.value]);
const columnsForSearch = ref<TableColumn[]>([...columns.value]);

const search = ref<string>("");

const displayColumn = (column: string): boolean =>
  !!displayedColumns.value.find((item) => item.code === column);

const initProducts = () => {
  getAllProducts().then((data: Product[]) => (products.value = data));
};

onMounted(() => {
  initProducts();
});

const searchProducts = () => {
  if (!products.value) return;

  if (!search.value || !columnsForSearch.value.length) {
    initProducts();
  } else {
    getSearchedProducts(search.value, columnsForSearch.value).then((res) => {
      products.value = res;
    });
  }
};

const resetSearchValue = () => {
  search.value = "";
  initProducts();
};

const formatCurrency = (value: number) => {
  if (value)
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  return;
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "INSTOCK":
      return "success";
    case "LOWSTOCK":
      return "warning";
    case "OUTOFSTOCK":
      return "danger";
    default:
      return null;
  }
};
</script>

<style lang="scss" scoped>
.table-search {
  &__header {
    display: grid;
    grid-template-columns: 4fr 1fr;
    column-gap: 20px;

    &-search {
      display: grid;
      grid-template-columns: 3rem 1fr 100px;

      .p-multiselect {
        width: 100%;
        background: var(--green-500);
      }

      .p-inputtext {
        border-radius: 0;
        width: 100%;
      }

      &__field {
        position: relative;
      }

      &__close-icon {
        position: absolute;
        right: 0.75rem;
        top: calc(50% - 0.75rem);
        width: 1.5rem;
        height: 1.5rem !important;
        padding: 0.2rem;
      }
    }

    &-fields .p-multiselect {
      width: 100%;
    }
  }

  &__img {
    width: 64px;
    border-radius: 5px;
    box-shadow: 0 4px 10px #00000008, 0 0 2px #0000000f, 0 2px 6px #0000001f;
  }
}
</style>
