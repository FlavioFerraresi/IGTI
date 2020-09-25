//utilizando callbacks
//import fs from 'fs';
/*console.log(1);
fs.writeFile('teste.txt', 'teste flavio', function (err) {
  console.log(2);
  if (err) {
    console.log(err);
  } else {
    fs.appendFile('teste.txt', '\nteste flavio 2', function (err) {
      if (err) {
        console.log(err);
      } else {
        fs.readFile('teste.txt', 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});
console.log(3); //apenas pra mostrar que o (2) esta dentro da callback e foi para o event loop
*/

//exemplo sincrono- executa tudo na sequencia (nao recomendado)
/*try {
  console.log(1);
  fs.appendFileSync('teste2.txt', 'flavio sync 1');
  console.log(2);
  const data = fs.readFileSync('teste2.txt', 'utf-8');
  console.log(data);
  console.log(3);
} catch (err) {
  console.log(err);
}*/

//com promises (promises hell)
//import { promises as fsPromises } from 'fs';
/*fsPromises
  .writeFile('teste3.txt', 'teste 3 com promisses')
  .then(() => {
    fsPromises
      .appendFile('teste3.txt', '\nnova linha')
      .then(() => {
        fsPromises
          .readFile('teste3.txt', 'utf-8')
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
*/

//formato mais limpo e elegante
import { promises as fsPromises } from 'fs';
async function init() {
  try {
    await fsPromises.writeFile('teste4.txt', 'teste 4 com promisses');
    await fsPromises.appendFile('teste4.txt', '\nnova linha');
    const data = await fsPromises.readFile('teste4.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function writeReadJson() {
  try {
    const arrayCarros = ['gol', 'palio', 'uno'];
    const obj = {
      carros: arrayCarros,
    };

    await fsPromises.writeFile('teste.json', JSON.stringify(obj));
    const data = JSON.parse(await fsPromises.readFile('teste.json'));
    console.log(data);
    data.carros.push('sandero');
    console.log(data);
    await fsPromises.writeFile('teste.json', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

init();
writeReadJson();
