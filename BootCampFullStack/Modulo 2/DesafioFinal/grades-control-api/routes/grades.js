import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

//metodo post para criacao das grades
router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;

    //validacao de campos
    if (
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error('student, subject, type e value sao obrigatorios');
    }

    const data = JSON.parse(await readFile(gFilename));

    //fazendo o spread para deixar o id no inicio do array
    //removido o spred, para evitar q seja inseridos campos indevidos
    grade = {
      id: data.nextId,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.nextId++;
    data.grades.push(grade);

    await writeFile(gFilename, JSON.stringify(data, null, 2));

    res.send(grade);

    gLogger.info(`Post /grades - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

//metodo put para atualizar os registros
//atualizacao integral (put)
router.put('/', async (req, res, next) => {
  try {
    const grade = req.body;
    const data = JSON.parse(await readFile(gFilename));

    if (
      !grade.id ||
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error('Id, student, subject, type e value sao obrigatorios');
    }

    //localiza o index do id
    const index = data.grades.findIndex((grad) => grad.id === grade.id);

    //validando campos
    if (index < 0) {
      throw new Error('registro nao encontrado');
    }

    //atualiza as informacoes
    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(gFilename, JSON.stringify(data, null, 2));
    res.send(grade);

    gLogger.info(`Put /grades - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

//metodo delete, removendo com index encontrado (splice)
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));

    //localiza o index do id
    const index = data.grades.findIndex(
      (grad) => grad.id === parseInt(req.params.id)
    );
    if (index < 0) {
      throw new Error('registro nao encontrado');
    }

    data.grades.splice(index, 1);

    /*data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );*/

    await writeFile(gFilename, JSON.stringify(data, null, 2));
    res.end();

    gLogger.info(`Delete /grades/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//metodo get por id para pegar a grade solicitada
router.get('/porId/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );
    res.send(grade);

    gLogger.info(`Get /grades/porId/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

//metodo get para somar notas de um aluno e disciplina
router.get('/SomarNotas', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    const filter = req.body;

    if (!filter.student || !filter.subject) {
      throw new Error('Student e subject sao obrigatorios');
    }

    const totalNotas = data.grades.reduce((acc, current) => {
      if (
        current.student === filter.student &&
        current.subject === filter.subject
      ) {
        return acc + current.value;
      } else {
        return acc;
      }
    }, 0);

    res.send({ sumValue: totalNotas });

    gLogger.info(
      `Get /grades/somarNotas - ${filter.student} - ${filter.subject}`
    );
  } catch (err) {
    next(err);
  }
});

//metodo get para calcular a media das notas de uma disciplia e tipo
router.get('/MediaNotas', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    const filter = req.body;

    if (!filter.subject || !filter.type) {
      throw new Error('Subject e type sao obrigatorios');
    }

    const gradesFiltered = data.grades.filter((grade) => {
      return grade.subject === filter.subject && grade.type === filter.type;
    });

    const averageValues =
      gradesFiltered.reduce((acc, current) => {
        return acc + current.value;
      }, 0) / gradesFiltered.length;

    res.send({ averageValues: averageValues, gradesFiltered });

    gLogger.info(`Get /grades/MediaNotas - ${filter.subject} - ${filter.type}`);
  } catch (err) {
    next(err);
  }
});

//metodo get para retornar as 3 maiores notas do subject e type
router.get('/MaioresNotas', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(gFilename));
    const filter = req.body;

    if (!filter.subject || !filter.type) {
      throw new Error('Subject e type sao obrigatorios');
    }

    const gradesFiltered = data.grades
      .filter((grade) => {
        return grade.subject === filter.subject && grade.type === filter.type;
      })
      .sort((a, b) => {
        return b.value - a.value;
      });

    res.send(gradesFiltered.slice(0, 3));
    //res.send(gradesFiltered);

    gLogger.info(
      `Get /grades/MaioresNotas - ${filter.subject} - ${filter.type}`
    );
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
