<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { customToast } from '../utils/toastUtils';
import { generator } from  '../utils/clientGeneratorUtils';

const loading = ref(false)

// Define o evento que será emitido
const emit = defineEmits(['clienteCadastrado'])

// Estado do formulário
const formData = ref({
    nome: '',
    email: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    origin: 'digital',
});

// Função para buscar o endereço pelo CEP
const handleCepBlur = async () => {
    if (!formData.value.cep) return;

    try {
        loading.value = true;
        const response = await axios.get(`https://viacep.com.br/ws/${formData.value.cep}/json/`);
        if (response.data.erro) throw new Error('CEP não encontrado');
        const { logradouro, localidade, uf } = response.data;
        formData.value.endereco = logradouro;
        formData.value.cidade = localidade;
        formData.value.estado = uf;
        loading.value = false;
    } catch (error) {
        Object.assign(formData.value, {
            endereco: '',
            cidade: '',
            estado: '',
            cep: '',
        });
        loading.value = false;
        customToast('Cep não encontrado!', 'error');
    }
};

// Função para submeter o formulário
const handleSubmit = async () => {
    try {
    const response = await axios.post('https://vue-study-production.up.railway.app/clientes', {
      nome: formData.value.nome,
      email: formData.value.email,
      endereco: {
        cep: formData.value.cep,
        rua: formData.value.endereco,
        numero: formData.value.numero,
        complemento: formData.value.complemento,
        cidade: formData.value.cidade,
        estado: formData.value.estado
      },
      origem: formData.value.origin
    });

    customToast('Cliente cadastrado com sucesso!', 'success');

    // Emite o evento para notificar o componente pai
    emit('clienteCadastrado');

  } catch (error) {
    customToast('Erro: ' + error.response?.data?.message, 'error');
  } finally {
    formData.value.nome = '';
    formData.value.email = '';
    formData.value.cep = '';
    formData.value.endereco = '';
    formData.value.numero = '';
    formData.value.complemento = '';
    formData.value.cidade = '';
    formData.value.estado = '';
    formData.value.origin = 'digital';
  }
};



const handleGeneretor = async () => {
    const clienteGerated = generator();
    console.log(clienteGerated);

    formData.value.nome = clienteGerated.nome;
    formData.value.email = clienteGerated.email;
    formData.value.cep = clienteGerated.cep;
    formData.value.numero = clienteGerated.numero;
    formData.value.complemento = clienteGerated.complemento;
    formData.value.origin = clienteGerated.origin;

    await handleCepBlur();

    try {
        loading.value = true;
        await handleSubmit();
        loading.value = false;
    } catch (error) {
        console.log(error)
    }

}


</script>


<template>
    <div class="w-full h-full relative font-sofia">
        <!-- Overlay escurecido e spinner centralizado -->
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-lg z-50">
            <div class="animate-spin font-extrabold rounded-full h-16 w-16 border-t-4 border-aawzMain"></div>
        </div>

        <font-awesome-icon :icon="['fas', 'dice']" class="cursor-pointer absolute text-xl right-0 top-4 mr-4 text-gray-300 hover:text-gray-100" @click="handleGeneretor(index)"/>

        <form @submit.prevent="handleSubmit"
            class="space-y-6 p-6 bg-aawzBlack rounded-2xl shadow-lg border-2 border-aawzMain h-full">
            <h2 class="text-2xl font-bold text-aawzMain mb-6 text-center">Cadastro de Cliente</h2>

            <div class="relative z-0 w-full group">
                <input type="text" name="nome" id="nome" v-model="formData.nome"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " required />
                <label for="nome"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nome
                </label>
            </div>

            <div class="relative z-0 w-full group">
                <input type="email" name="email" id="email" v-model="formData.email"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " required />
                <label for="email"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email
                </label>
            </div>

            <div class="relative z-0 w-full group">
                <input type="text" name="cep" id="cep" v-model="formData.cep" @blur="handleCepBlur"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " required />
                <label for="cep"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    CEP
                </label>
            </div>

            <div class="flex gap-6">
                <div class="relative z-0 w-9/12 group">
                    <input type="text" name="endereco" id="endereco" v-model="formData.endereco"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" " disabled required />
                    <label for="endereco"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Endereço
                    </label>
                </div>
                <div class="relative z-0 w-3/12 group">
                    <input type="text" name="numero" id="numero" v-model="formData.numero"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" " required />
                    <label for="numero"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Número
                    </label>
                </div>
            </div>

            <div class="relative z-0 w-full group">
                <input type="text" name="complemento" id="complemento" v-model="formData.complemento"
                    class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                    placeholder=" " />
                <label htmlFor="complemento"
                    class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Complemento
                </label>
            </div>

            <div class="flex gap-6">
                <div class="relative z-0 w-9/12 group">
                    <input type="text" name="cidade" id="cidade" v-model="formData.cidade"
                        class="font-bold block py-2.5 px-0 w-full text-sm text-gray-300 focus:text-aawzMain bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-aawzMain peer"
                        placeholder=" " disabled required />
                    <label htmlFor="cidade"
                        class="peer-focus:font-medium absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-aawzMain  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Cidade
                    </label>
                </div>

                <div class="relative z-0 w-3/12 group">
                    <input type="text" name="estado" id="estado" v-model="formData.estado"
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
                    <select name="origin" v-model="formData.origin "
                        class="rounded-md bg-transparent border-2 border-gray-300 text-gray-300 text-sm focus:border-aawzMain block w-full p-2 focus:ring-0 focus:outline-none appearance-none cursor-pointer hover:border-aawzMain">
                        <option class='bg-aawzBlack' value="digital">Digital</option>
                        <option class='bg-aawzBlack hover:bg-sky-500' value="fisico">Físico</option>
                    </select>
                </div>
            </div>

            <button type="submit"
                class="w-full py-2.5 bg-aawzMain hover:bg-aawzSecondary text-black font-bold rounded-lg focus:outline-none">
                Criar Cliente
            </button>
        </form>
    </div>
</template>

