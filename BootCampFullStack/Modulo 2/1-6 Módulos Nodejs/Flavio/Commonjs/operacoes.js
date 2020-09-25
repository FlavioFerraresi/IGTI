const nome = 'flavio';

function soma(a, b) {
  return a + b;
}

function subtracao(a, b) {
  return a - b;
}

//exporta como objeto
module.exports = { soma, subtracao, nome };
