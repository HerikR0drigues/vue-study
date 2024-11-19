const Cliente = require('../models/Cliente');

const createCliente = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error });
  }
};

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find(); // Busca todos os clientes
    res.status(200).json(clientes); // Retorna os clientes encontrados
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error });
  }
};

module.exports = { createCliente, getClientes };