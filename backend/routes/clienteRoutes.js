const express = require('express');
const { createCliente, getClientes } = require('../controllers/clienteController');
const router = express.Router();

// Rota para criar cliente (POST)
router.post('/', createCliente);

// Rota para obter clientes (GET)
router.get('/', getClientes);

module.exports = router;
