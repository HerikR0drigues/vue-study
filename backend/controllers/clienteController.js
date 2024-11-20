const Cliente = require('../models/Cliente');

// Ler Clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error });
  }
};

// Criar Cliente
const createCliente = async (req, res) => {
  try {
    const existingCliente = await Cliente.findOne({ email: req.body.email });

    if (existingCliente) {
      return res.status(400).json({ message: 'Já existe um cliente cadastrado com este email.' });
    }

    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error });
  }
};

// Editar Cliente
const editCliente = async (req, res) => {
  try {
    // Busca o cliente pelo ID passado no corpo da requisição
    const clienteId = req.body.id;
    if (!clienteId) {
      return res.status(400).json({ message: 'ID do cliente não fornecido.' });
    }

    // Verifica se o cliente existe pelo ID
    const existingCliente = await Cliente.findById(clienteId);
    if (!existingCliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    // Atualiza os dados do cliente, verificando se o email novo já está em uso
    if (req.body.email && req.body.email !== existingCliente.email) {
      const emailInUse = await Cliente.findOne({ email: req.body.email });
      if (emailInUse) {
        return res.status(400).json({ message: 'Já existe um cliente cadastrado com este email.' });
      }
    }

    // Atualiza os campos do cliente
    const updatedCliente = await Cliente.findByIdAndUpdate(
      clienteId,
      req.body,
      { new: true, runValidators: true } // Retorna o cliente atualizado e aplica validações do schema
    );

    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar cliente', error });
  }
};

// Deletar Cliente
const deleteCliente = async (req, res) => {
  try {
    // Busca o cliente pelo ID passado no corpo da requisição
    const clienteId = req.body.id;
    if (!clienteId) {
      return res.status(400).json({ message: 'ID do cliente não fornecido.' });
    }

    // Verifica se o cliente existe pelo ID
    const existingCliente = await Cliente.findById(clienteId);
    if (!existingCliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    // Exclui o cliente pelo ID
    await Cliente.findByIdAndDelete(clienteId);

    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error });
  }
};




module.exports = { createCliente, getClientes, editCliente, deleteCliente};
