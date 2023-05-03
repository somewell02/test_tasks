<template>
  <base-layout>
    <form @submit.prevent="getTitle" class="link-form">
      <div class="link-form__field">
        <span class="p-input-icon-right">
          <i
            v-if="status === LinkStatus.Loading"
            class="pi pi-spin pi-spinner"
          />
          <input-text
            v-model="linkValue"
            ref="linkField"
            placeholder="https://"
            :class="[{ 'p-invalid': status === LinkStatus.Error }]"
            :disabled="status === LinkStatus.Success"
            @input="resetValidation"
            @focusout="getTitle"
          />
        </span>
        <small
          v-if="errorMessage"
          class="link-form__field-error p-error"
          id="text-error"
        >
          {{ errorMessage }}
        </small>
      </div>
      <prime-button
        icon="pi pi-pencil"
        class="link-form__btn"
        :disabled="status !== LinkStatus.Success"
        @click="editLink"
      />
    </form>
  </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import InputText from "primevue/inputtext";
import PrimeButton from "primevue/button";

import { ref } from "vue";

import LinkStatus from "@/types/link-field/LinkStatus";
import { getTitleAtUrl } from "@/data/link-field/getTitleAtUrl";

const linkValue = ref<string>("");
const currentLink = ref<string>("");
const status = ref<LinkStatus>(LinkStatus.Edit);
const errorMessage = ref<string>("");

const resetValidation = () => {
  status.value = LinkStatus.Edit;
  errorMessage.value = "";
};

const setError = (message: string): void => {
  status.value = LinkStatus.Error;
  errorMessage.value = message;
};

const getTitle = async () => {
  if (status.value !== LinkStatus.Edit || !linkValue.value) return;

  status.value = LinkStatus.Loading;
  const title = await getTitleAtUrl(linkValue.value);

  if (title) {
    status.value = LinkStatus.Success;

    currentLink.value = linkValue.value;
    linkValue.value = title;
  } else {
    setError("Ссылка не найдена или введена некорректно");
  }
};

const editLink = () => {
  linkValue.value = currentLink.value;
  status.value = LinkStatus.Edit;
};
</script>

<style lang="scss" scoped>
.link-form {
  margin-top: 30px;
  width: 100%;
  display: flex;
  column-gap: 20px;

  &__field {
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    position: relative;

    input {
      width: 100%;
    }

    &-error {
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
    }
  }
}
</style>
