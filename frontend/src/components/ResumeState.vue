<script setup>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { ref, computed, watch } from 'vue';

// Registra os módulos necessários do Chart.js
Chart.register(...registerables);
Chart.defaults.color = '#ffffff'; // Cor branca para textos

// Props para receber os clientes
const props = defineProps({
  clientes: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true
  }
});

// Contagem por estado
const estadoContagem = ref({});

// Observa mudanças em `clientes` e atualiza `estadoContagem`
watch(
  () => props.clientes,
  (newClientes) => {
    const contagem = newClientes.reduce((acc, usuario) => {
      const estado = usuario.endereco?.estado || 'Desconhecido';
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});
    estadoContagem.value = contagem;
  },
  { immediate: true }
);

// Dados formatados para o gráfico
const barChartData = computed(() => ({
  labels: Object.keys(estadoContagem.value),
  datasets: [
    {
      label: 'Quantidade de Clientes por Estado',
      data: Object.values(estadoContagem.value),
      backgroundColor: ['#52c227'],
    },
  ],
}));

</script>

<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center space-y-2 p-6 bg-aawzBlack rounded-2xl shadow-lg border-2 border-aawzMain">
      <h2 class="text-2xl font-bold text-aawzMain mb-6 text-center">Clientes por Estado</h2>
      <div class="w-full justify-center flex">
        <div v-if="props.loading">
          <div class="animate-spin font-extrabold rounded-full h-12 w-12 border-t-4 border-gray-300"></div>
        </div>
        <div v-else>
          <!-- Verifica se há clientes -->
          <p v-if="!clientes || clientes.length === 0" class="text-gray-300 text-xl text-center">
            Nenhum cliente cadastrado.
          </p>
          <div v-else class="text-gray-300 text-xl text-center">
            <!-- Renderiza o gráfico -->
            <BarChart
              class="max-h-80"
              :chart-data="barChartData"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

