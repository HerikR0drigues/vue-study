  <script setup>
  import { onMounted, ref } from 'vue';
  import ClientForm from '../components/ClientForm.vue';
  import ClientTable from '../components/ClientTable.vue';
  import axios from 'axios';

  const clientes = ref([]); 

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/clientes');
      clientes.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Ocorreu um erro ao buscar os clientes.');
    } finally {
      // loading.value = false;
    }
  };

  onMounted(() => {
    fetchClientes();
  })

</script>

  <template>
    <div
      class="flex flex-row max-w-7xl container mx-auto my-auto p-6 font-poppins items-center justify-center h-full space-x-4">
      <div class="flex w-1/3 ">
        <ClientForm @clienteCadastrado="fetchClientes"/>
      </div>

      <div class="flex flex-col w-2/3">
        <ClientTable v-bind:clientes="clientes" />
      </div>
    </div>
  </template>

<style scoped>
/* Using Tailwind */
</style>
