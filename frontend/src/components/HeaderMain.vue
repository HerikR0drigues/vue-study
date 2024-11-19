<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { logout } from '../auth';   

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/');
};
</script>

<template>
  <header class="bg-aawzBlack shadow-sm border-b border-gray-300 font-poppins">
    <div class="justify-between max-w-7xl mx-auto px-4 py-4 flex items-center">
      <i class="text-white font-pixelfy text-3xl font-bold">
        Herik<span class="text-aawzMain">.dev</span>
      </i>

      <nav class="flex space-x-4 items-center">
        <RouterLink to="/home" class="text-white hover:text-aawzMain transition">Home</RouterLink>
        <RouterLink to="/dashboard" class="text-white hover:text-aawzMain transition">Dashboard</RouterLink>
        <RouterLink to="/about" class="text-white hover:text-aawzMain transition">Sobre</RouterLink>
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
/* Using Tailwind */
</style>
