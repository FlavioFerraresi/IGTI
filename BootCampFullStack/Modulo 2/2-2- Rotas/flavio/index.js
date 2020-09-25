import express from 'express';

const app = express();
app.use(express.json()); //parametro para trabalhar com json no boby

//todos os metodos passam por aqui no all
//get, post, delete, etc
app.all('/testAll', (req, res) => {
  res.send(req.method);
});

// "?" permite que o ultimo "e" fique opcional
app.get('/teste?', (_, res) => {
  res.send('/teste?');
});

// "+" indica que a letra anterior ao "+" pode repetir varias vezes
app.get('/buzz+', (_, res) => {
  res.send('/buzz+');
});

//permite receber qualquer coisa no lugar do "*" exemplo /oneCarroBlue
app.get('/one*Blue', (req, res) => {
  res.send(req.path);
});

//o que estiver dentro do parentese, é tratado como unidade, no caso "ing"
//colocando "?", o "ing" fica opcional
app.post('/test(ing)?', (req, res) => {
  console.log(req.body); //pegando parametros no body
  res.send('/test(ing)?');
});

//com expressao regular (qualquer coisa com red)
app.get(/.*Red$/, (req, res) => {
  res.send('/.*Red$/');
});

//pegando paramrametro na url (na rota)
//colocando "?" o parametro "a" fica opcional
app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + req.params.a);
});

//paraetros via query
//localhost:3000/testQuery?nome=flavio&email=xyz&cpf=123
app.get('/testQuery', (req, res) => {
  res.send(req.query);
});

//next - chama mais de uma funcao
//é o terceiro parametro na call back, e precisa ser chamado apos finalizar o trecho de codigo
//precisa parar a execução com res.send() ou res.end()
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('callback 1');
    next();
  },
  (req, res, next) => {
    console.log('callback 1');
    next();
  },
  (req, res) => {
    console.log('callback 3');
    res.end();
  }
);

//next com array
const callback1 = (req, res, next) => {
  console.log('callback1');
  next();
};
function callback2(req, res, next) {
  console.log('callback2');
  next();
}
const callback3 = (req, res) => {
  console.log('callback3');
  res.end();
};
app.get('/testMultipleHandlersArray', [callback1, callback2, callback3]);

//route - pode receber mais de um metodo
//tem q definir a callback para cada verbo http
//é diferente do all (que pega todos os verbos)
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('/testRoute GET');
  })
  .post((req, res) => {
    res.send('/testRoute POST');
  })
  .delete((req, res) => {
    res.send('/testRoute DELETE');
  });

app.listen(3000, () => {
  console.log('api started!');
});
