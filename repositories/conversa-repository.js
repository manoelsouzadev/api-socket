"use  strict";
const mongoose = require("mongoose");
const Mensagem = require("../models/mensagem");

exports.save = async (req, res, data) => {
  console.log("chegou aqui");
  var mensagem = new Mensagem(data);
  await mensagem.save()
    .then(() => {
      res.status(201).send({
        message: "Mensagem cadastrada com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao cadastrar mensagem",
        data: e,
      });
    });
};

exports.getByIdRoom = async (room) => {
  return await Mensagem.find().where("room").equals(room);
};

exports.put = async (req, res, id, data) => {
  Mensagem.findByIdAndUpdate(id, {
    $set: {
      room: data.room,
      idUsuario: data.idUsuario,
      nomeUsuario: data.nomeUsuario,
      mensagem: data.mensagem,
      dataMensagem: data.dataMensagem,
    },
  })
    .then((x) => {
      res.status(200).send({ message: "Mensagem atualizada com sucesso!" });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar a mensagem",
        data: e,
      });
    });
};

exports.delete = async (id) => {
  await Mensagem.findOneAndRemove(id);
};
