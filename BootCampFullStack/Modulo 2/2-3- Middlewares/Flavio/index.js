import express from 'express';
import carrosRouter from './carrosRouter.js';

const app = express();
app.use(express.json());

//rotas do nivel da aplicacao, ficam no mesmo arquivo

//o app.use sempre vai executar, podemos utilizar pra gravar um log antes de entrar em qualquer metodo
app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.get('/teste', (req, res) => {
  res.end();
});

//rodas no nivel do roteador, pode ficar em outro arquivo
//nesse caso, tudo que chegar no /carro, sera direcionado para carrosRouter
app.use('/carros', carrosRouter);

app.listen(3000, () => {
  console.log('api started!');
});
