import express from 'express';
import winston from 'winston';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';

const { readFile, writeFile } = fs;

global.gFilename = 'accounts.json';

//estrutura do logger
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.gLogger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors()); //libera todos os endpoints para outra origem (locallhost:3001)
app.use('/doc', swagger.serve, swagger.setup(swaggerDocument));
app.use(express.static('public')); //servindo o html static de teste
app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile(gFilename);
    gLogger.info('api started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(gFilename, JSON.stringify(initialJson))
      .then(() => {
        gLogger.info('api started and file created!');
      })
      .catch((err) => {
        gLogger.error(err);
      });
  }
});
