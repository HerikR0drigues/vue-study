import { toast } from 'vue3-toastify';
import { h } from 'vue'; // Importa o método h do Vue 3 para criar a estrutura do Toast

// Função para exibir o toast customizado
export const customToast = (message, type = 'success', options = {}) => {
  const validTypes = ['success', 'error', 'info', 'warning'];
  if (!validTypes.includes(type)) {
    type = 'success'; // Tipo padrão
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
      ...options.toastStyle, // Permite sobrescrever o estilo se necessário
    },
    position: 'top-right',
    autoClose: 3000,
    transition: 'fade',
    closeButton: true,
    ...options, // Permite sobrescrever qualquer outra opção do toast
  });
};

// Função para exibir o Toast de confirmação com botões
export const customConfirmToast = (message, onConfirm, onCancel, options = {}) => {
  const toastId = toast.info(
    h(
      'div',
      {},
      [
        h('p', { style: { marginBottom: '16px', textAlign: 'center', fontSize: '16px' } }, message),
        h(
          'div',
          { style: { display: 'flex', justifyContent: 'center', gap: '12px' } },
          [
            // Botão "Sim"
            h('button', {
              onClick: () => {
                onConfirm();
                toast.update(toastId, {
                  isLoading: false,
                  render: 'Ação confirmada!',
                  type: 'success',
                  autoClose: 1000,
                });
              },
              style: {
                padding: '10px 20px',
                backgroundColor: '#28a745', // Verde
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s, background-color 0.3s',
              },
              onMouseOver: (e) => {
                e.target.style.backgroundColor = '#218838'; // Verde mais escuro
                e.target.style.transform = 'scale(1.05)'; // Pequeno aumento
              },
              onMouseOut: (e) => {
                e.target.style.backgroundColor = '#28a745';
                e.target.style.transform = 'scale(1)';
              },
            }, 'Sim'),

            // Botão "Não"
            h('button', {
              onClick: () => {
                onCancel();
                toast.update(toastId, {
                  isLoading: false,
                  render: 'Ação cancelada!',
                  type: 'error',
                  autoClose: 1000,
                });
              },
              style: {
                padding: '10px 20px',
                backgroundColor: '#dc3545', // Vermelho
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s, background-color 0.3s',
              },
              onMouseOver: (e) => {
                e.target.style.backgroundColor = '#c82333'; // Vermelho mais escuro
                e.target.style.transform = 'scale(1.05)'; // Pequeno aumento
              },
              onMouseOut: (e) => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.transform = 'scale(1)';
              },
            }, 'Não'),
          ]
        ),
      ]
    ),
    {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: 'confirmation-toast',
      toastStyle: {
        fontSize: '14px',
        color: '#FFFFFF',
        background: 'linear-gradient(45deg, #1C1A1E, #333333)',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '16px 20px',
        opacity: 0.95,
        cursor: 'default',
      },
      ...options, // Permite sobrescrever qualquer outra opção do toast
    }
  );
};
