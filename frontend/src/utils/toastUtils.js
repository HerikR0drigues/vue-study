// src/utils/toastUtils.js

import { toast } from 'vue3-toastify';

export const customToast = (message, type = 'success', options = {}) => {
  // Verifica se o tipo é válido, caso contrário, usa 'success' como padrão
  const validTypes = ['success', 'error', 'info', 'warning'];
  if (!validTypes.includes(type)) {
    type = 'success';  // Tipo padrão
  }

  toast[type](message, {
    toastStyle: {
      fontSize: '14px',
      color: '#FFFFFF',
      background: 'linear-gradient(45deg, #1C1A1E, #333333)',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      padding: '12px 18px',
      opacity: 0.9,
      ...options.toastStyle,  // Permite sobrescrever o estilo se necessário
    },
    position: 'top-right',
    autoClose: 2000,
    transition: 'fade',
    closeButton: true,
    ...options,  // Permite sobrescrever qualquer outra opção do toast
  });
};
