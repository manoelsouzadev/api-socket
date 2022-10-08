'use  strict';
const mongoose = require('mongoose');
const Mensagem = require("../models/mensagem");

exports.save = async data => {
  console.log("chegou aqui")
  var mensagem = new Mensagem(data);
  await mensagem.save();
};

exports.getByIdRoom = async (room) => {
    return await Mensagem.find().where('room').equals(room); 
};

exports.put = async (id, data) => {
    Mensagem.findByIdAndUpdate(id, {
    $set: {
        room: req.body.room,
        idUsuario: req.body.idUsuario,
        nomeUsuario: req.body.nomeUsuario,
        mensagem: req.body.mensagem,
        dataMensagem: req.body.dataMensagem
    }
  })
    .then(x => {
      res.status(200).send({ message: 'Mensagem atualizada com sucesso!' });
    })
    .catch(e => {
      
      res.status(400).send({
        message: 'Falha ao atualizar a mensagem',
        data: e
      });
    });
};

exports.delete = async(id) => {
  await Mensagem.findOneAndRemove(id);
};
