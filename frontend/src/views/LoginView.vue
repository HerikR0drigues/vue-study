<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { login } from '../auth';

const email = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email: email.value,
      password: password.value,
    });

    if (response.data.token) {
    login(response.data.token);
      router.push('/home');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    errorMessage.value = error.response?.data?.message || 'Erro ao fazer login';
  }
};
</script>

<template>
    <div class="flex flex-col md:flex-row h-screen font-poppins">

        <!-- Primeira Metade -->
        <div class="flex flex-col justify-center items-center h-full w-full md:w-1/2 bg-aawzBlack">

            <div class="flex flex-col w-full px-6 py-4 lg:max-w-md space-y-6">

                <!-- Logo disponível apenas no mobile -->
                <div class="md:hidden flex justify-center mb-4">
                    <img class="h-24 w-24 -mt-6" src="/logo-herikdev.png" alt="Herik.Dev">
                </div>

                <!-- Título -->
                <h1 class="text-aawzMain font-bold text-3xl">Fazer Login</h1>

                <!-- Formulário -->
                <form @submit.prevent="handleSubmit" class="w-full">
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-bold text-aawzMain">Email</label>
                        <input 
                            v-model="email" 
                            type="email" 
                            id="email" 
                            aria-label="Digite seu email" 
                            aria-required="true"
                            class="bg-gray-100 border bg-transparent border-gray-500 text-white text-sm rounded-lg focus:ring-2 focus:ring-aawzMain focus:outline-none w-full p-2.5" 
                            placeholder="name@email.com" 
                            required 
                        />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-bold text-aawzMain">Senha</label>
                        <input 
                            v-model="password"
                            type="password" 
                            id="password" 
                            aria-label="Digite sua senha" 
                            aria-required="true"
                            class="bg-gray-100 border bg-transparent border-gray-500 text-white text-sm rounded-lg focus:ring-2 focus:ring-aawzMain focus:outline-none w-full p-2.5"
                            required 
                        />
                    </div>

                    <!-- Exibir mensagens -->
                    <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

                    <!-- Botão -->
                    <div class="flex justify-center">
                        <button 
                            type="submit" 
                            class="text-black font-bold bg-aawzMain hover:bg-aawzSecondary focus:ring-4 focus:outline-none focus:ring-aawzSecondary rounded-full text-sm w-full sm:w-auto min-w-[10rem] px-5 py-2.5 text-center">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Segunda Metade, visível apenas em telas maiores -->
        <div class="hidden md:flex justify-center items-center h-full w-full md:w-1/2 bg-aawzMain">
            <div class="flex flex-col w-full px-6 py-4 lg:max-w-lg text-center">
                <h1 class="text-aawzBlack font-extrabold mb-12 mt-2 text-5xl">CRUD by <span class="text-5xl">Herik.Dev</span></h1>
                <p class="text-aawzBlack font-medium text-lg">Faça o login para ter acesso ao dashboard</p>
            </div>
        </div>
    </div>
</template>



<style scoped>
/* Using Tailwind */
</style>
