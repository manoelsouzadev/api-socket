'use  strict';
const mongoose = require('mongoose');
const repository = require("../repositories/conversa-repository");

exports.save = async data => {
  await repository.save(data);
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
