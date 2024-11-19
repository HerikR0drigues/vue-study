<script setup>
import HeaderMain from './components/HeaderMain.vue';
import FooterMain from './components/FooterMain.vue';
import { RouterView } from 'vue-router';
import { isAuthenticated } from './auth';

</script>

<template>
  <div id="app" class="flex flex-col min-h-screen bg-aawzBlack">
    <!-- Header fixo, visível apenas se o usuário estiver autenticado -->
    <HeaderMain v-if="isAuthenticated" />

    <!-- Conteúdo dinâmico -->
    <main class="flex flex-col space-y-4 flex-grow">
      <RouterView />
    </main>

    <!-- Footer fixo, visível apenas se o usuário estiver autenticado -->
    <FooterMain v-if="isAuthenticated" />
  </div>
</template>

<style>
/* using Tailwind */
</style>
