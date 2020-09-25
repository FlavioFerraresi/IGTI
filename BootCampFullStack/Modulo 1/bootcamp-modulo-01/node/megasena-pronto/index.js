/**
 * Indicando que o express será utilizado
 * neste arquivo
 */
var express = require('express');

/**
 * Módulo nativo do Nodejs
 * para trabalhar com arquivos
 */
var fs = require('fs');

/**
 * Instanciando o express
 */
var app = express();

/**
 * Estado da aplicação
 */
var lotteryNumbers = [];

/**
 * Função para obtenção de número aleatório
 * entre 1 e 60
 */
function getLotteryNumber() {
  return Math.max(1, Math.ceil(Math.random() * 60));
}

/**
 * Função principal que monta um
 * vetor de números da loteria
 */
function getLotteryNumbers() {
  /**
   * Reinicializando o estado
   */
  lotteryNumbers = [];

  while (lotteryNumbers.length < 6) {
    var newNumber = getLotteryNumber();

    /**
     * Verificando se o número já existe
     * no vetor
     */
    if (lotteryNumbers.indexOf(newNumber) === -1) {
      lotteryNumbers.push(newNumber);
    }
  }

  lotteryNumbers.sort(function(a, b) {
    return a - b;
  });
}

function saveGame() {
  var date = new Date();
  var fileName =
    'game-' +
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    '-' +
    date.getHours() +
    '-' +
    date.getMinutes() +
    '-' +
    date.getSeconds() +
    '.txt';

  fs.writeFileSync(
    './games/' + fileName,
    JSON.stringify(lotteryNumbers, null, 2)
  );
}

app.get('/', function(req, res, next) {
  res.json({ message: 'Bem-vindo ao app de loteria. Acesse /lottery.' });
});

/**
 * Definindo rota para /lottery
 */
app.get('/lottery', function(req, res, next) {
  // Obtendo os números
  getLotteryNumbers();

  // Guardando o resultado em um arquivo
  saveGame();

  // Retornando o resultado
  res.json({ numbers: lotteryNumbers });
});

/**
 * Inicializando o app na porta 8100
 */
app.listen('8100');
