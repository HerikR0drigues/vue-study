const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  endereco: {
    cep: String,
    rua: String,
    numero: String,
    complemento: String,
    cidade: String,
    estado: String,
  },
  origem: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cliente', clienteSchema);
