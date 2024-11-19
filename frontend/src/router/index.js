import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import AboutView from '../views/AboutView.vue';
import HomeView from '../views/HomeView.vue';

// Função que verifica autenticação
const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && isAuthenticated()) {
    // Se o usuário já está autenticado e tenta acessar a página de login, redireciona para o Login
    next({ name: 'home' });
  } else if (to.meta.requiresAuth && !isAuthenticated()) {
    // Se o usuário não está autenticado e tenta acessar uma rota protegida, redireciona para Login
    next({ name: 'login' });
  } else {
    // Prossegue normalmente
    next();
  }
});

export default router;
