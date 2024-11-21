<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col text-center max-w-7xl container mx-auto my-auto p-6 font-poppins items-center justify-center h-full ">
    <h1 class="text-5xl mb-4 font-bold text-aawzMain">Home</h1>
    <h2 class="text-3xl mb-8 font-bold text-aawzMain">Bem vindo ao sistema CRUD!</h2>
    <p class="text-aawzMain mb-8">Nesse sistema você poderá gerir usuários (Criar, ler, editar, excluir) e ver um resumo em gráficos.</p>
    <RouterLink to="/dashboard">
      <button class="bg-transparent font-bold border border-aawzMain text-aawzMain px-6 py-2 rounded  hover:text-aawzBlack hover:bg-aawzMain transition">Ir para Dashboard</button>
    </RouterLink>
  </div>
</template>

<style scoped>
/* Using Tailwind */
</style>
