function soma(a, b) {
  return a + b;
}

console.log(soma(1, 2));

function comparaNumeros(a, b) {
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - b; //mais elegante, mas tem q testar se ta positivo ou negativo na chamada
}

console.log(comparaNumeros(1, 1));
console.log(comparaNumeros(1, 2));
console.log(comparaNumeros(2, 1));

function somaAte(de, ate) {
  var somatorio = 0;

  for (let index = de; index <= ate; index++) {
    somatorio += index;
  }
  return somatorio;
}

console.log(somaAte(1, 10));
console.log(somaAte(1, 20));
