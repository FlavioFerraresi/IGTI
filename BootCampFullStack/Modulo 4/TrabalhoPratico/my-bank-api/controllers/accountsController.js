import { db } from '../models/index.js';

const accounts = db.accounts;

const deposito = async (req, res) => {
  const { agencia, conta, valor } = req.params;

  try {
    const data = await accounts.findOneAndUpdate(
      { agencia: agencia, conta: conta },
      { $inc: { balance: valor } },
      { returnOriginal: false }
    );

    if (!data) {
      res
        .status(404)
        .send(
          `Agencia e Conta nao encontrada para deposito: ${agencia}-${conta}`
        );
    } else {
      res.send({ saldo: data.balance });
    }
  } catch (error) {
    res
      .status(500)
      .send(`Erro ao realizar deposito: ${agencia}-${conta} - ${error}`);
  }
};

const saque = async (req, res) => {
  const { agencia, conta, valor } = req.params;
  const valorComTaxa = Number(valor) + 1;

  try {
    const data = await accounts.findOne(
      { agencia: agencia, conta: conta },
      { _id: 0, balance: 1 }
    );

    if (!data) {
      res
        .status(404)
        .send(`Agencia e Conta nao encontrada para saque: ${agencia}-${conta}`);
    } else {
      if (data.balance < valorComTaxa) {
        res
          .status(412)
          .send(
            `Saldo insuficiente para este saque. (saldo : ${data.balance}) Para cada saque tem uma taxa de 1`
          );
      } else {
        const dataUpdated = await accounts.findOneAndUpdate(
          { agencia: agencia, conta: conta },
          { $inc: { balance: -valorComTaxa } },
          { returnOriginal: false }
        );

        res.send({ saldo: dataUpdated.balance });
      }
    }
  } catch (error) {
    res
      .status(500)
      .send(`Erro ao realizar saque: ${agencia}-${conta} - ${error}`);
  }
};

const consultaSaldo = async (req, res) => {
  const { agencia, conta } = req.params;

  try {
    const data = await accounts.findOne(
      { agencia: agencia, conta: conta },
      { _id: 0, balance: 1 }
    );

    if (!data) {
      res
        .status(404)
        .send(
          `Agencia e Conta nao encontrada para consulta de saldo: ${agencia}-${conta}`
        );
    } else {
      res.send({ saldo: data.balance });
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `Erro ao realizar a consulta de saldo: ${agencia}-${conta} - ${error}`
      );
  }
};

const deletaConta = async (req, res) => {
  const { agencia, conta } = req.params;

  try {
    console.log('antes');
    const data = await accounts.findOneAndRemove({
      agencia: agencia,
      conta: conta,
    });
    console.log(data);
    if (!data) {
      res
        .status(404)
        .send(
          `Agencia e Conta nao encontrada para exclusao: ${agencia}-${conta}`
        );
    } else {
      const qtdeContasDaAgencia = await accounts.countDocuments({
        agencia: agencia,
      });

      res.send({ qtdeContasAtivas: qtdeContasDaAgencia });
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `Erro ao realizar a exclusao da conta: ${agencia}-${conta} - ${error}`
      );
  }
};

const transferencia = async (req, res) => {
  const { contaOrigem, contaDestino, valor } = req.params;
  const taxa = 8;
  let valorComTaxa = +valor;
  try {
    //busca conta origem
    const dataOrigem = await accounts.findOne(
      { conta: contaOrigem },
      { _id: 0, agencia: 1, conta: 1, balance: 1 }
    );

    //busca conta destino
    const dataDestino = await accounts.findOne(
      { conta: contaDestino },
      { _id: 0, agencia: 1, conta: 1, balance: 1 }
    );

    if (!dataOrigem) {
      res
        .status(404)
        .send(`Conta origem nao encontrada para transferencia: ${contaOrigem}`);
    } else {
      if (!dataDestino) {
        res
          .status(404)
          .send(
            `Conta destino nao encontrada para transferencia: ${contaDestino}`
          );
      } else {
        //verifica se nao for mesma agencia acrescenta a taxa
        if (dataOrigem.agencia !== dataDestino.agencia) {
          valorComTaxa += taxa;
        }
        console.log(dataOrigem.balance);
        //verifica se tem saldo disponivel para transferencia
        if (dataOrigem.balance < valorComTaxa) {
          res
            .status(405)
            .send(
              `saldo da conta origem insuficiente para transferencia: ${dataOrigem.balance}`
            );
        } else {
          //faz a retirada na origem
          const dataOrigemUpd = await accounts.findOneAndUpdate(
            { agencia: dataOrigem.agencia, conta: dataOrigem.conta },
            { $inc: { balance: -valorComTaxa } },
            { returnOriginal: false }
          );

          //faz o deposito na destino
          const dataDestinoUpd = await accounts.findOneAndUpdate(
            { agencia: dataDestino.agencia, conta: dataDestino.conta },
            { $inc: { balance: valor } },
            { returnOriginal: false }
          );

          res.send({ saldoOrigem: dataOrigemUpd.balance });
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `Erro ao realizar transferencia: ${contaOrigem}-${contaDestino} - ${error}`
      );
  }
};

const mediaSaldo = async (req, res) => {
  const { agencia } = req.params;

  try {
    const data = await accounts.aggregate([
      { $match: { agencia: { $in: [+agencia] } } },
      { $group: { _id: '$agencia', mediaBalance: { $avg: '$balance' } } },
    ]);
    if (!data) {
      res
        .status(404)
        .send(`Agencia nao encontrada para media do saldo: ${agencia}`);
    } else {
      res.send({ mediaSaldo: data[0].mediaBalance });
    }
  } catch (error) {
    res
      .status(500)
      .send(`Erro ao realizar a media de saldo: ${agencia} - ${error}`);
  }
};

const listaMenorSaldo = async (req, res) => {
  const { qtdeClientesLista } = req.params;

  try {
    const data = await accounts.aggregate([
      { $sort: { balance: 1 } },
      { $limit: +qtdeClientesLista },
      { $project: { _id: 0, agencia: 1, conta: 1, balance: 1 } },
    ]);
    console.log(data);
    console.log(qtdeClientesLista);
    res.send(data);
  } catch (error) {
    res.status(500).send(`Erro ao realizar a menor saldo: ${error}`);
  }
};

const listaMaiorSaldo = async (req, res) => {
  const { qtdeClientesLista } = req.params;

  try {
    const data = await accounts.aggregate([
      { $sort: { balance: -1, name: 1 } },
      { $limit: +qtdeClientesLista },
      { $project: { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 } },
    ]);
    console.log(data);
    console.log(qtdeClientesLista);
    res.send(data);
  } catch (error) {
    res.status(500).send(`Erro ao realizar a maior saldo: ${error}`);
  }
};

const transferePrivate = async (_, res) => {
  try {
    //ordena pelo maio saldo, agrupa por agencia e pega o primeiro de cada agencia
    const data = await accounts.aggregate([
      { $sort: { balance: -1 } },
      {
        $group: {
          _id: '$agencia',
          maiorBalance: {
            $first: '$balance',
          },
          conta: {
            $first: '$conta',
          },
        },
      },
      { $project: { _id: 0, agencia: '$_id', maiorBalance: 1, conta: 1 } },
    ]);

    let clienstePrivate = [];
    //transferi para agencia 99 private
    for (const item of data) {
      const dataUpd = await accounts.findOneAndUpdate(
        { agencia: item.agencia, conta: item.conta },
        { agencia: 99 },
        { returnOriginal: false }
      );

      clienstePrivate = [...clienstePrivate, dataUpd];
    }

    res.send(clienstePrivate);
  } catch (error) {
    res.status(500).send(`Erro ao transferir clientes private: ${error}`);
  }
};

export default {
  deposito,
  saque,
  consultaSaldo,
  deletaConta,
  transferencia,
  mediaSaldo,
  listaMenorSaldo,
  listaMaiorSaldo,
  transferePrivate,
};
