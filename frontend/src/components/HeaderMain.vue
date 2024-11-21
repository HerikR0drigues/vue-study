<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { logout } from '../auth';

const router = useRouter();

// Estado para controlar a visibilidade do menu em mobile
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<template>
  <header class="bg-aawzBlack shadow-sm border-b border-gray-300 font-poppins">
    <div class="justify-between max-w-7xl mx-auto px-4 py-4 flex items-center">
      <!-- Logo -->
      <i class="text-white font-pixelfy text-3xl font-bold">
        Herik<span class="text-aawzMain">.dev</span>
      </i>

      <!-- Botão de hambúrguer (visível apenas no mobile) -->
      <button @click="toggleMenu" class="lg:hidden text-gray-300 focus:outline-none">
        <svg class="fill-current text-aawzMain" viewBox="0 0 100 80" width="24" height="24">
          <rect width="100" height="20" rx="8"></rect>
          <rect y="30" width="100" height="20" rx="8"></rect>
          <rect y="60" width="100" height="20" rx="8"></rect>
        </svg>
    </button>

      <!-- Menu principal -->
      <nav
        :class="[
          'lg:flex lg:space-x-4 lg:items-center',
          isMenuOpen ? 'block' : 'hidden',
          'absolute lg:static bg-aawzBlack lg:bg-transparent top-16 left-0 w-full lg:w-auto p-4 lg:p-0 z-50 shadow-lg lg:shadow-none text-left flex flex-col lg:flex-row space-y-4 lg:space-y-0'
        ]"
      >
        <RouterLink to="/home" class="text-white hover:text-aawzMain transition">Home</RouterLink>
        <RouterLink to="/dashboard" class="text-white hover:text-aawzMain transition">Dashboard</RouterLink>
        <RouterLink to="/resume" class="text-white hover:text-aawzMain transition">Resumo</RouterLink>
        <button
          @click="handleLogout"
          class="bg-transparent border border-aawzMain text-white px-2 py-1 rounded hover:border-red-800 hover:text-red-800 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>

<style>
/* Using Tailwind for styling */
</style>
