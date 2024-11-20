const express = require('express');
const { createCliente, getClientes, editCliente, deleteCliente } = require('../controllers/clienteController');
const router = express.Router();

// Rota para obter clientes (GET)
router.get('/', getClientes);

// Rota para criar cliente (POST)
router.post('/', createCliente);

// Rota editar cliente (POST)
router.post('/edit', editCliente);

// Rota delete cliente (POST)
router.post('/delete', deleteCliente);


module.exports = router;
