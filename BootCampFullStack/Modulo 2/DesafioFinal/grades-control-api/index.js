import express from 'express';
import winston from 'winston';
import gradesRouter from './routes/grades.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.gFilename = 'grades.json';

//estrutura do logger
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.gLogger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

const app = express();
app.use(express.json());
app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  try {
    await readFile(gFilename);
    gLogger.info('api started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      grades: [],
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
