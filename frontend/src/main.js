import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'  // Importando o CSS do toastify

// Importações do Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Ícones sólidos

// Adiciona a coleção de ícones à biblioteca
library.add(fas);

const app = createApp(App)

// Registra o componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')
