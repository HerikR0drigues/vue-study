<script setup>
import { onMounted, ref } from 'vue';
import ResumeOrigin from '@/components/ResumeOrigin.vue';
import ResumeState from '@/components/ResumeState.vue';
import ResumeTotalClients from '@/components/ResumeTotalClients.vue';
import axios from 'axios';

const clientes = ref([]);
const loading = ref(false);

// Função para buscar os clientes
const fetchClientes = async () => {
  try {
    loading.value = true;
    const response = await axios.get('https://vue-study-production.up.railway.app/clientes');
    clientes.value = response.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error('Erro ao buscar clientes:', error);
    alert('Ocorreu um erro ao buscar os clientes.');
  }
};

// Chamada para buscar clientes quando o componente for montado
onMounted(() => {
  fetchClientes();
});

</script>

<template>
    <div class="flex flex-col justify-center items-center px-4 py-8 space-y-4 flex-grow">
      <!-- Container principal -->
      <div class="flex flex-col md:h-[630px] font-sofia w-full max-w-7xl space-y-4">
        <!-- Total de clientes -->
        <div class="flex w-full">
          <ResumeTotalClients :clientes="clientes" :loading="loading" />
        </div>
  
        <!-- Div para graficos -->
        <div class="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4">
          <div class="flex w-full md:w-1/2">
            <ResumeState :clientes="clientes" :loading="loading"/>
          </div>
          <div class="flex w-full md:w-1/2">
            <ResumeOrigin :clientes="clientes" :loading="loading"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>
/* Usando Tailwind */
</style>
