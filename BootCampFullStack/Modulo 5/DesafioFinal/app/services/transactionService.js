const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

async function BuscaPorAnoMes(ano, mes) {
  const data = await TransactionModel.find({ year: ano, month: mes });
  return data;
}

async function BuscaPorId(id) {
  const data = await TransactionModel.findById({ _id: id });
  return data;
}

async function InsereLancamento(info) {
  const transactionModel = new TransactionModel({
    description: info.description,
    value: info.value,
    category: info.category,
    year: info.year,
    month: info.month,
    day: info.day,
    yearMonth: info.yearMonth,
    yearMonthDay: info.yearMonthDay,
    type: info.type,
  });

  const data = await transactionModel.save();
  return data;
}

async function AtualizaLancamento(id, info) {
  const data = await TransactionModel.findByIdAndUpdate({ _id: id }, info, {
    new: true,
  });
  return data;
}

async function DeletaLancamento(id) {
  const data = await TransactionModel.findByIdAndRemove({ _id: id });
  return data;
}

module.exports = {
  BuscaPorAnoMes,
  BuscaPorId,
  InsereLancamento,
  AtualizaLancamento,
  DeletaLancamento,
};
