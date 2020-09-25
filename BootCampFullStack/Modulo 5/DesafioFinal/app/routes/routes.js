const express = require('express');
const { ValidaData } = require('../helpers/ValidaDatas.js');

const {
  BuscaPorAnoMes,
  BuscaPorId,
  InsereLancamento,
  AtualizaLancamento,
  DeletaLancamento,
} = require('../services/transactionService.js');

const transactionRouter = express.Router();

transactionRouter.get('/', async (req, res) => {
  const period = ValidaData(req.query.period);

  if (!period) {
    res.status(412).send({
      error:
        "É necessário informar o parâmetro 'period', cujo valor deve estar no formato yyyy-mm",
    });
  } else {
    try {
      const data = await BuscaPorAnoMes(period.year(), period.month() + 1);

      if (!data) {
        res
          .status(404)
          .send(
            `Não encontrou registros para esse Ano-Mes: ${period.year()}-${
              period.month() + 1
            }`
          );
      } else {
        //retorna description em lowercase
        const dataNew = data
          .map((lancamento) => {
            const {
              _id,
              description,
              value,
              category,
              year,
              month,
              day,
              yearMonth,
              yearMonthDay,
              type,
            } = lancamento;

            return {
              id: _id,
              description,
              value,
              category,
              year,
              month,
              day,
              yearMonth,
              yearMonthDay,
              type,
              descriptionLowerCase: description.toLowerCase(),
            };
          })
          .sort((a, b) => a.day - b.day);

        const qtdeLancamentos = data.length;
        const receitas = data.reduce((acc, cur) => {
          if (cur.type === '+') {
            return acc + cur.value;
          } else {
            return acc;
          }
        }, 0);
        const despesas = data.reduce((acc, cur) => {
          if (cur.type === '-') {
            return acc + cur.value;
          } else {
            return acc;
          }
        }, 0);
        const saldo = receitas - despesas;

        res.send({
          qtdeLancamentos,
          receitas,
          despesas,
          saldo,
          lancamentos: dataNew,
        });
      }
    } catch (error) {
      res
        .status(500)
        .send(
          `Erro ao buscar registros por Ano-Mes: ${period.year()}-${
            period.month() + 1
          } - ${error}`
        );
    }
  }
});

transactionRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const data = await BuscaPorId(id);

    if (!data) {
      res.status(404).send(`Não encontrou registro para esse id: ${id}`);
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).send(`Erro ao buscar registro por id: ${id} - ${error}`);
  }
});

transactionRouter.post('/insereLancamento', async (req, res) => {
  if (!ValidaData(req.body.yearMonth)) {
    res.status(412).send({
      error: 'Ano-Mes inválido, deve estar no formato yyyy-mm',
    });
  } else {
    try {
      const data = await InsereLancamento(req.body);

      res.send(data);
    } catch (error) {
      res.status(500).send(`Erro ao inserir lançamento: ${error}`);
    }
  }
});

transactionRouter.put('/atualizaLancamento/:id', async (req, res) => {
  if (!ValidaData(req.body.yearMonth)) {
    res.status(412).send({
      error: 'Ano-Mes inválido, deve estar no formato yyyy-mm',
    });
  } else {
    try {
      const data = await AtualizaLancamento(req.params.id, req.body);

      res.send(data);
    } catch (error) {
      res.status(500).send(`Erro ao atualizar lançamento: ${error}`);
    }
  }
});

transactionRouter.delete('/deletaLancamento/:id', async (req, res) => {
  try {
    const data = await DeletaLancamento(req.params.id);

    if (!data) {
      res
        .status(404)
        .send(`Não encontrou lançamento para exclusão: ${req.params.id}`);
    } else {
      res.send('Lançamento excluido com sucesso');
    }
  } catch (error) {
    res.status(500).send(`Erro ao excluir lançamento: ${error}`);
  }
});

module.exports = transactionRouter;
