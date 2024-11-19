<script setup>
import { onMounted, ref } from 'vue';
import { defineProps } from 'vue';

const loading = ref(false);
const expandedIndex = ref(null);

defineProps({
    clientes: {
        type: Object,
        required: true
    }
});

const toggleExpand = (index) => {
    expandedIndex.value = index === expandedIndex.value ? null : index;
};

</script>

<template>
    <div class="w-full relative font-sofia">
        <!-- Overlay escurecido e spinner centralizado -->
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg z-50">
            <div class="animate-spin font-extrabold rounded-full h-16 w-16 border-t-4 border-blue-900"></div>
        </div>

        <div class="space-y-6 p-6 h-[640px] bg-aawzBlack rounded-2xl shadow-lg border-2 border-aawzMain flex flex-col overflow-y-auto">
            <h2 class="text-2xl font-bold text-aawzMain mb-6 text-center">Tabela de Clientes</h2>
            <div class="space-y-2 overflow-y-auto max-h-[600px] scrollbar-thumb-aawzMain scrollbar-track-aawzBlack scrollbar-thin px-2">
                
                <!-- Loop para exibir os clientes -->
                <div v-for="(cliente, index) in clientes" :key="index" @click="toggleExpand(index)"
                    class="text-gray-300 bg-aawzBlack px-4 py-2 relative rounded-md shadow-md cursor-pointer transition-all duration-300 border-2 border-aawzThird hover:border-aawzSecondary hover:bg-zinc-800">
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

        </div>
    </div>
</template>
