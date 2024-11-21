<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import axios from 'axios';
import { customToast, customConfirmToast } from '../utils/toastUtils';

const emit = defineEmits();

const loading = ref(false);
const expandedIndex = ref(null);

defineProps({
    clientes: {
        type: Object,
        required: true
    },
    loadingTwo: {
        type: Boolean,
        required: true
    }
});

const toggleExpand = (index) => {
    expandedIndex.value = index === expandedIndex.value ? null : index;
};

const handleEdit = (cliente) => {
    emit('editarCliente', cliente);
};

const handleDelete = async (cliente) => {
    customConfirmToast(
        'Tem certeza que deseja excluir esse Cliente?',
        async () => {
            try {
                loading.value = true;

                // Enviar apenas o ID do cliente para a exclusão
                const response = await axios.post('https://vue-study-production.up.railway.app/clientes/delete', {
                    id: cliente._id // Certifique-se de que o cliente tem o ID correto
                });

                // Notificação de sucesso
                customToast('Cliente excluído com sucesso!', 'success');

                // Emite o evento para notificar o componente pai
                emit('clienteDeletado', cliente._id); // Passando o ID do cliente para o componente pai
            } catch (error) {
                console.log(error);  // Para verificar toda a estrutura de erro
                customToast('Erro: ' + (error.response?.data?.message || error.message), 'error');
            } finally {
                loading.value = false;
            }
        },
        () => {
            return
        }
    );
};

</script>

<template>
    <div class="w-full h-full relative font-sofia">
        <!-- Overlay escurecido e spinner centralizado -->
        <div v-if="loading"
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg z-50">
            <div class="animate-spin font-extrabold rounded-full h-16 w-16 border-t-4 border-blue-900"></div>
        </div>

        <div
            class="p-6 h-full bg-aawzBlack rounded-2xl shadow-lg border-2 border-aawzMain flex flex-col overflow-y-auto">
            <h2 class="text-2xl font-bold text-aawzMain mb-8 text-center">Tabela de Clientes</h2>

            <!-- Spinner -->
            <template v-if="loadingTwo">
                <div class="flex justify-center items-center h-full">
                    <div class="animate-spin font-extrabold rounded-full h-12 w-12 border-t-4 border-gray-300"></div>
                </div>
            </template>

            <template v-else>
                <div v-if="Object.keys(clientes).length <= 0" class="space-y-2 text-center">
                    <p class="text-xl text-gray-300 font-bold">Nenhum cliente cadastrado!</p>
                </div>
                <div v-else
                    class="space-y-2 overflow-y-auto max-h-[600px] scrollbar-thumb-aawzMain scrollbar-track-aawzBlack scrollbar-thin px-2">

                    <div v-for="(cliente, index) in clientes" :key="index"
                        class="text-gray-300 bg-aawzBlack px-4 py-2 relative rounded-md shadow-md transition-all duration-300 border-2 border-aawzThird hover:border-aawzSecondary hover:bg-zinc-800 cursor-default">
                        <font-awesome-icon :icon="['fas', 'eye']"
                            class="cursor-pointer absolute right-0 top-2 mr-14 text-blue-600 hover:opacity-60"
                            @click="toggleExpand(index)" />
                        <font-awesome-icon :icon="['fas', 'pen-to-square']"
                            class="cursor-pointer absolute right-0 top-2 mr-8 text-yellow-300 hover:opacity-60"
                            @click="handleEdit(cliente)" />
                        <font-awesome-icon :icon="['fas', 'trash-can']"
                            class="cursor-pointer absolute right-0 top-2 mr-2 text-red-500 hover:opacity-60"
                            @click="handleDelete(cliente)" />
                        <p class="text-gray-300 font-bold text-sm">
                            <strong>Nome:</strong> {{ cliente.nome }}
                        </p>
                        <p class="text-gray-300 text-sm">
                            <strong>Email:</strong> {{ cliente.email }}
                        </p>

                        <!-- Exibir detalhes adicionais do cliente -->
                        <div v-if="expandedIndex === index">
                            <p class="text-gray-300 text-sm">
                                <strong>CEP:</strong> {{ cliente.endereco.cep }}
                            </p>
                            <p class="text-gray-300 text-sm">
                                <strong>Endereço:</strong> {{ cliente.endereco?.rua }}
                            </p>
                            <p class="text-gray-300 text-sm">
                                <strong>Número:</strong> {{ cliente.endereco.numero }}
                            </p>
                            <p class="text-gray-300 text-sm">
                                <strong>Complemento:</strong> {{ cliente.endereco.complemento }}
                            </p>
                            <p class="text-gray-300 text-sm">
                                <strong>Cidade:</strong> {{ cliente.endereco.cidade }}
                            </p>
                            <p class="text-gray-300 text-sm">
                                <strong>Estado:</strong> {{ cliente.endereco.estado }}
                            </p>
                            <p class="text-gray-300 text-sm">
                                <strong>Origem:</strong> {{ cliente.origem }}
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
