<script setup lang="ts">
import {RouterView} from 'vue-router'
import MainHeader from '@widgets/Header/ui/MainHeader.vue'
</script>

<template>
  <div class="app-container">
    <MainHeader/>
    <div class="body-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .body-container {
    padding: 20px;
  }
}
</style>

