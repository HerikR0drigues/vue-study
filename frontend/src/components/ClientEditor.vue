<script setup>
import axios from 'axios';
import { reactive, ref, watch  } from 'vue';
import { customToast } from '../utils/toastUtils';


const props = defineProps({
    cliente: Object
});

const clienteParaEditar = reactive({
  nome: '',
  email:'',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  origin: '',
  id: '',
});

// Atualiza os valores reativos quando a prop 'cliente' muda
watch(
  () => props.cliente,
  (newCliente) => {
    if (newCliente) {
        clienteParaEditar.nome = newCliente.nome || '';
        clienteParaEditar.email = newCliente.email || '';
        clienteParaEditar.cep = newCliente.cep || '';
        clienteParaEditar.endereco = newCliente.endereco || '';
        clienteParaEditar.origin = newCliente.origem || '';
        clienteParaEditar.id = newCliente._id || '';
    }
  },
  { immediate: true } // Executa no momento da inicialização
);

const loading = ref(false)

// Define o evento que será emitido
const emit = defineEmits(['clienteEditado', 'cancelarEdicao']);


// Função para buscar o endereço pelo CEP
const handleCepBlur = async () => {
    if (!clienteParaEditar.endereco.cep) return;

    try {
        loading.value = true;
        const response = await axios.get(`https://viacep.com.br/ws/${clienteParaEditar.endereco.cep}/json/`);
        
        if (response.data.erro) throw new Error('CEP não encontrado');

        const { logradouro, localidade, uf } = response.data;
        clienteParaEditar.endereco.rua = logradouro || '';
        clienteParaEditar.endereco.cidade = localidade || '';
        clienteParaEditar.endereco.estado = uf || '';

    } catch (error) {
        clienteParaEditar.endereco.rua = '';
        clienteParaEditar.endereco.cidade = '';
        clienteParaEditar.endereco.estado = '';
        clienteParaEditar.endereco.cep = '';

        customToast('Cep não encontrado!', 'error');
    } finally {
        loading.value = false; // Garante que o loading será atualizado mesmo com erro
    }
};

// Função para submeter o formulário
const handleSubmit = async () => {
    try {
    const response = await axios.post('https://vue-study-production.up.railway.app/clientes/edit', {
      nome: clienteParaEditar.nome,
      email: clienteParaEditar.email,
      endereco: {
        cep: clienteParaEditar.endereco.cep,
        rua: clienteParaEditar.endereco.rua,
        numero: clienteParaEditar.endereco.numero,
        complemento: clienteParaEditar.endereco.complemento,
        cidade: clienteParaEditar.endereco.cidade,
        estado: clienteParaEditar.endereco.estado
      },
      origem: clienteParaEditar.origin,
      id: clienteParaEditar.id
    });

    customToast('Cliente editado com sucesso!', 'success');

    // Emite o evento para notificar o componente pai
    emit('clienteEditado');

  } catch (error) {
    customToast('Erro: ' + error.response?.data?.message, 'error');
  } finally {
    clienteParaEditar.nome = '';
    clienteParaEditar.email = '';
    clienteParaEditar.endereco.cep = '';
    clienteParaEditar.endereco.rua = '';
    clienteParaEditar.endereco.numero = '';
    clienteParaEditar.endereco.complemento = '';
    clienteParaEditar.endereco.cidade = '';
    clienteParaEditar.endereco.estado = '';
    clienteParaEditar.origin = 'digital';
  }
};

const handleCancelEdit = () => {
    clienteParaEditar.nome = '';
    clienteParaEditar.email = '';
    clienteParaEditar.endereco.cep = '';
    clienteParaEditar.endereco.rua = '';
    clienteParaEditar.endereco.numero = '';
    clienteParaEditar.endereco.complemento = '';
    clienteParaEditar.endereco.cidade = '';
    clienteParaEditar.endereco.estado = '';
    clienteParaEditar.origin = 'digital';
    emit('cancelarEdicao');
}

</script>


<template>
    <div class="w-full h-full relative font-sofia">
        <!-- Overlay escurecido e spinner centralizado -->
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-lg z-50">
            <div class="animate-spin font-extrabold rounded-full h-16 w-16 border-t-4 border-aawzMain"></div>
        </div>

        <div v-if="!props.cliente" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl z-50">
            <div class="flex bg-zinc-950 opacity-90 p-4 rounded-xl">
                <p class="text-white mr-3 text-xl">Aguardando um cliente para editar...</p>
                <div class="animate-spin font-extrabold rounded-full h-8 w-8 border-t-4 border-red-500"></div>
            </div>  
        </div>

        <font-awesome-icon :icon="['fas', 'x']" :class="[!props.cliente? 'text-red-800 hover:text-red-400' : 'text-gray-300 hover:text-gray-100', 'cursor-pointer absolute text-xl right-0 top-4 mr-4']" @click="handleCancelEdit(index)"/>

        <form @submit.prevent="handleSubmit"
            :class="[!props.cliente ? 'border-red-500' : 'border-aawzMain','space-y-6 p-6 bg-aawzBlack rounded-2xl shadow-lg border-2 border-aawzMain h-full']">
            <h2 :class="[!props.cliente ? 'text-red-500' : 'text-aawzMain','text-2xl font-bold  mb-6 text-center']">Edição de Cliente</h2>

            <div class="relative z-0 w-full group">
                <input type="text" name="nome" id="nome" v-model="clienteParaEditar.nome"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " required />
                <label for="nome"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nome
                </label>
            </div>

            <div class="relative z-0 w-full group">
                <input type="email" name="email" id="email" v-model="clienteParaEditar.email"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " required />
                <label for="email"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email
                </label>
            </div>

            <div class="relative z-0 w-full group">
                <input type="text" name="cep" id="cep" v-model="clienteParaEditar.endereco.cep" @blur="handleCepBlur"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " required />
                <label for="cep"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    CEP
                </label>
            </div>

            <div class="flex gap-6">
                <div class="relative z-0 w-9/12 group">
                    <input type="text" name="endereco" id="endereco" v-model="clienteParaEditar.endereco.rua"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" " disabled required />
                    <label for="endereco"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Endereço
                    </label>
                </div>
                <div class="relative z-0 w-3/12 group">
                    <input type="text" name="numero" id="numero" v-model="clienteParaEditar.endereco.numero"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" " required />
                    <label for="numero"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Número
                    </label>
                </div>
            </div>

            <div class="relative z-0 w-full group">
                <input type="text" name="complemento" id="complemento" v-model="clienteParaEditar.endereco.complemento"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " />
                <label htmlFor="complemento"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Complemento
                </label>
            </div>

            <div class="flex gap-6">
                <div class="relative z-0 w-9/12 group">
                    <input type="text" name="cidade" id="cidade" v-model="clienteParaEditar.endereco.cidade"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" " disabled required />
                    <label htmlFor="cidade"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Cidade
                    </label>
                </div>

                <div class="relative z-0 w-3/12 group">
                    <input type="text" name="estado" id="estado" v-model="clienteParaEditar.endereco.estado"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" "disabled required />
                    <label htmlFor="estado"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Estado
                    </label>
                </div>
            </div>

            <div class="relative z-0 w-full group">
                <label class="block mb-2 text-sm text-gray-300">Origem</label>
                <div class="relative">
                    <select name="origin" v-model="clienteParaEditar.origin"
                        class="rounded-md bg-transparent border-2 border-gray-300 text-gray-300 text-sm focus:border-aawzMain block w-full p-2 focus:ring-0 focus:outline-none appearance-none cursor-pointer hover:border-aawzMain">
                        <option class='bg-aawzBlack' value="digital">Digital</option>
                        <option class='bg-aawzBlack hover:bg-sky-500' value="fisico">Físico</option>
                    </select>
                </div>
            </div>

            <button type="submit"
                :class="[!props.cliente ? 'bg-red-500' : 'bg-aawzMain', 'w-full py-2.5  hover:bg-aawzSecondary text-black font-bold rounded-lg focus:outline-none']">
                Editar Cliente
            </button>
        </form>
    </div>
</template>

