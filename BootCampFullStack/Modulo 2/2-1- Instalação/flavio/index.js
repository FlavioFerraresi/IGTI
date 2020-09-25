import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hello word!');
});

app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const result = a + b;
  res.send(`Resultado ${result}`);
});

app.listen(3000, () => {
  console.log('api started!');
});
