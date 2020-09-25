import express from 'express';

const app = express();
app.use(express.json());

//tratamento padrao de erro
app.get('/', (req, res) => {
  throw new Error('error message teste');
});

//quando for assincrona, precisa passar o erro na callback
app.post('/', async (req, res, next) => {
  try {
    throw new Error('error message async');
  } catch (err) {
    next(err);
  }
});

//precisa ficar no final para pegar todos os acima
app.use((err, req, res, next) => {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('ocorreu um erro, tente novamente' + err);
});

app.listen(3000, () => {
  console.log('api started!');
});
