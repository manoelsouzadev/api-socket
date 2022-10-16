"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  room: {
    type: String,
    required: true,
  },
  idUsuario: {
    type: String,
    required: true,
  },
  idUsuarioAtendimento: {
    type: String,
  },
  nomeUsuario: {
    type: String,
    required: true,
  },
  mensagem: {
    type: String,
    required: true,
  },
  dataMensagem: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Mensagem", schema);