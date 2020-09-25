import express from 'express';

import accountsController from '../controllers/accountsController.js';

const app = express();

app.put('/MyBank/deposito/:agencia/:conta/:valor', accountsController.deposito);
app.put('/MyBank/saque/:agencia/:conta/:valor', accountsController.saque);
app.get(
  '/MyBank/consultaSaldo/:agencia/:conta',
  accountsController.consultaSaldo
);
app.delete(
  '/MyBank/deletaConta/:agencia/:conta',
  accountsController.deletaConta
);
app.put(
  '/MyBank/transferencia/:contaOrigem/:contaDestino/:valor',
  accountsController.transferencia
);
app.get('/MyBank/mediaSaldo/:agencia', accountsController.mediaSaldo);
app.get(
  '/MyBank/listaMenorSaldo/:qtdeClientesLista',
  accountsController.listaMenorSaldo
);
app.get(
  '/MyBank/listaMaiorSaldo/:qtdeClientesLista',
  accountsController.listaMaiorSaldo
);
app.put('/MyBank/transferePrivate', accountsController.transferePrivate);

export { app as accountsRouter };
