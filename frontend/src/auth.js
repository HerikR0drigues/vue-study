import { ref } from 'vue';

export const isAuthenticated = ref(false);

export const login = (token) => {
  localStorage.setItem('authToken', token); 
  isAuthenticated.value = true; 
};

export const logout = () => {
  localStorage.removeItem('authToken');
  isAuthenticated.value = false; 
};

// Inicializa o estado com base no localStorage
isAuthenticated.value = localStorage.getItem('authToken') !== null;
