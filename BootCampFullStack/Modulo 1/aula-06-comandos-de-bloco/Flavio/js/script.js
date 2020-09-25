console.log('olá, mundo!');

var titulo = document.querySelector('h1');
titulo.textContent = 'modificado por Flavio';

// comentario de linha

/*
comentario de bloco
teste
*/

var a = 5;
var b = 4;

if (a > b) {
  console.log(a + ' é maior que ' + b);
} else {
  if (a < b) {
    console.log(a + ' é menor que ' + b);
  } else {
    console.log(a + ' é igual a ' + b);
  }
}

var dia = 1;

switch (dia) {
  case 1:
    console.log('Domingo');
    break;
  case 2:
    console.log('Segunda');
    break;
  case 3:
    console.log('Terça');
    break;
  case 4:
    console.log('Quarta');
    break;
  case 5:
    console.log('Quinta');
    break;
  case 6:
    console.log('Sexta');
    break;
  case 7:
    console.log('Sábado');
    break;
  default:
    console.log('Dia inválido');
    break;
}

var a = 6;
var b = 5;
var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
console.log(resposta);

// soma de 1 a 10 = 55
var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}
console.log('A soma é ' + somatorio);

var numeroAtual = 1;
var somatorio = 0;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);
console.log('A soma é ' + somatorio);

var somatorio = 0;

for (let numeroAtual = 1; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}
console.log('A soma é ' + somatorio);
