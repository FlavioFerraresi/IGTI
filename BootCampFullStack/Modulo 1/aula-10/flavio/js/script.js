'use strict'; //o javascript acusa mais erros

//var let

//var tem escopo amplo
//let tem escopo reduzido

function withVar() {
  for (var index = 0; index < 10; index++) {
    console.log('var' + index);
  }

  index = 20;
  console.log('var' + index);
}
function withlet() {
  for (let index = 0; index < 10; index++) {
    console.log('let' + index);
  }

  /*  index = 20;
  console.log('let' + index);*/
}
withVar();
withlet();

//const - nao pode mudar valores
const c = 10;
//c = 20;
console.log(c);
//mas permite mudar array
const d = [];
d.push(1);
console.log(d);

//arrow function
function sum(a, b) {
  return a + b;
}

//funcao anonima
const sum2 = function (a, b) {
  return a + b;
};

//arrow
const sum3 = (a, b) => {
  return a + b;
};

//arrow reduzida
const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

//template literals
const name = 'flavio';
const surName = 'Ferraresi';
const text1 = 'meu nome é ' + name + ' ' + surName;
const text2 = `meu nome é ${name} ${surName}`;

console.log(text1);
console.log(text2);

//parametros default
const sum5 = (a, b = 10) => a + b;
console.log(sum5(2));
console.log(sum5(2, 3));
