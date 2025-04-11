<template>
  <div class="not-found">
    <h1 class="not-found__title">404</h1>
    <p class="not-found__text">Страница не найдена</p>
    <RouterLink to="/" class="not-found__link">На главную</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  text-align: center;

  &__title {
    font-size: 96px;
    font-weight: 700;
    color: #444;
    margin: 0 0 16px;
  }

  &__text {
    font-size: 20px;
    color: #777;
    margin-bottom: 24px;
  }

  &__link {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: hsla(157, 100%, 48%, 0.4);
    border-radius: 6px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
      background-color:hsla(160, 100%, 37%, 1);
    }
  }
}
</style>
