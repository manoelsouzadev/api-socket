'use  strict';
const mongoose = require('mongoose');
const repository = require("../repositories/conversa-repository");

exports.save = async data => {
  await repository.save(data).then(() => {
    res.status(201).send({
      message: 'Mensagem cadastrada com sucesso!'
    });
  })
  .catch(e => {
    res.status(400).send({
      message: 'Falha ao cadastrar mensagem',
      data: e
    });
  });
};

exports.getByIdRoom = async (room) => {
    return await repository.getByIdRoom(room); 
};

exports.put = async (id, data) => {
   await  repository.put(id, data);
};

exports.delete = async(id) => {
  await repository.delete(id);
};
