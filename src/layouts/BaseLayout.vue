<template>
  <div class="base-layout">
    <main class="base-layout__main container">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    flex-grow: 3;
  }
}
</style>
