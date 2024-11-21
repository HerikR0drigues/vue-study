<script setup>

defineProps({
  clientes: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

</script>

<template>
  <div class="w-full">
    <div class="flex flex-col justify-center items-center space-y-2 p-6 bg-aawzBlack rounded-2xl shadow-lg border-2 border-aawzMain">
      <h2 class="text-2xl font-bold text-aawzMain mb-6 text-center">Total de clientes cadastrados</h2>
      <div class="w-full max-h-[227px] justify-center flex">
        <div v-if="loading">
          <div class="animate-spin font-extrabold rounded-full h-12 w-12 border-t-4 border-gray-300"></div>
        </div>
      
        <div v-else>
          <p v-if="!clientes || clientes.length === 0" class="text-gray-300 text-xl text-center">
            Nenhum dado disponível para gerar o gráfico.
          </p>
          <p class="text-4xl text-gray-300 font-bold" v-else>{{ clientes.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
