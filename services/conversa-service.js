'use  strict';
const mongoose = require('mongoose');
const repository = require("../repositories/conversa-repository");

exports.save = async (req, res, data) => {
  await repository.save(req, res, data);
};

exports.getByIdRoom = async (room) => {
    return await repository.getByIdRoom(room); 
};

exports.put = async (id, data) => {
   await  repository.put(req, res, id, data);
};

exports.delete = async(id) => {
  await repository.delete(id);
};
