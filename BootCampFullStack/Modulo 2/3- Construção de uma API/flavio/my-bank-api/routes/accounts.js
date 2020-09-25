import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';

const { readFile, writeFile } = fs;

const router = express.Router();

//metodo post para criacao das contas
router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    //validacao de campos
    if (!account.name || account.balance == null) {
      throw new Error('Name e Balance sao obrigatorios');
    }

    const data = JSON.parse(await readFile(gFilename));

    //fazendo o spread para deixar o id no inicio do array
    //removido o spred, para evitar q seja inseridos campos indevidos
    account = { id: data.nextId, name: account.name, balance: account.balance };

    data.nextId++;
    data.accounts.push(account);

    await writeFile(gFilename, JSON.stringify(data, null, 2));

    res.send(account);

    gLogger.info(`Post /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

//metodo get para pegar todas as contas
//liberando apenas um endpoint(atraves do cors()), para outros hosts
// passar "cors()," no segundo parametro
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    delete data.nextId;
    res.send(data);

    gLogger.info('Get /account');
  } catch (err) {
    next(err);
  }
});

//metodo get por id para pegar a conta solicitada
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);

    gLogger.info(`Get /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//metodo delete, removendo com o filter ignorando o id passado
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );

    await writeFile(gFilename, JSON.stringify(data, null, 2));
    res.end();

    gLogger.info(`Delete /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//metodo put para atualizar os registros
//atualizacao integral (put)
router.put('/', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(gFilename));

    if (!account.id || !account.name || account.balance == null) {
      throw new Error('ID, Name e Balance sao obrigatorios');
    }

    //localiza o index do id
    const index = data.accounts.findIndex((acc) => acc.id === account.id);

    //validando campos
    if (index < 0) {
      throw new Error('registro nao encontrado');
    }

    //atualiza as informacoes
    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(gFilename, JSON.stringify(data, null, 2));
    res.send(account);

    gLogger.info(`Put /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

//metodo patch para atualizar os registro
//atualizacao parcial (patch)
router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(gFilename));

    if (!account.id || account.balance == null) {
      throw new Error('id e Balance sao obrigatorios');
    }

    //localiza o index do id
    const index = data.accounts.findIndex((acc) => acc.id === account.id);

    //validando campos
    if (index < 0) {
      throw new Error('registro nao encontrado');
    }

    //atualiza apenas a informacao do balance
    data.accounts[index].balance = account.balance;

    await writeFile(gFilename, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);

    gLogger.info(`Patch /account/updateBalance - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

//tratamento de erros, todos os endpoints utilizam o next no catch por conta do async
//e cai no router.use
router.use((err, req, res, next) => {
  gLogger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
