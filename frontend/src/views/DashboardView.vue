<script setup>
import { onMounted, ref } from 'vue';
import ClientForm from '../components/ClientForm.vue';
import ClientTable from '../components/ClientTable.vue';
import ClientEditor from '../components/ClientEditor.vue';
import axios from 'axios';

const clientes = ref([]);
const clienteParaEditar = ref(null);  // Variável para armazenar o cliente a ser editado

// Função para buscar os clientes
const fetchClientes = async () => {
  try {
    const response = await axios.get('https://vue-study-production.up.railway.app/clientes');
    clientes.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    alert('Ocorreu um erro ao buscar os clientes.');
  }
};

// Chamada para buscar clientes quando o componente for montado
onMounted(() => {
  fetchClientes();
});

// Função para lidar com o cliente a ser editado
const handleClienteEdit = (cliente) => {
  clienteParaEditar.value = cliente;  // Atualiza o cliente a ser editado
};

// Função para esvaziar o componente de edicao
const handleClienteEditClear = () => {
  clienteParaEditar.value = null;
};

</script>

<template>
  <div class="flex flex-col justify-center items-center px-4 py-8 space-y-4 flex-grow">
    <div class="md:h-[630px] font-sofia justify-between w-full max-w-7xl flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <!-- Componente para cadastrar novo cliente -->
      <div class="flex lg:w-1/3 w-full">
        <ClientForm @clienteCadastrado="fetchClientes"/>
      </div>

      <!-- Componente de Tabela de clientes com a opção de editar -->
      <div class="flex lg:w-1/3 w-full">
        <ClientTable 
          :clientes="clientes" 
          @editarCliente="handleClienteEdit" 
          @clienteDeletado="fetchClientes"
        />
      </div>

      <!-- Componente para editar cliente -->
      <div class="flex lg:w-1/3 w-full">
        <ClientEditor :cliente="clienteParaEditar"
        @clienteEditado="() => { fetchClientes(); handleClienteEditClear(); }" 
        @cancelarEdicao="handleClienteEditClear"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Usando Tailwind */
</style>
