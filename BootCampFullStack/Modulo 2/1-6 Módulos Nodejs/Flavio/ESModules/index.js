//para importar os modulos do operacoes.js
import op from './operacoes.js'; //exportacao default
import operacoes2 from './operacoes2.js';
import { divisao, resto } from './operacoes3.js'; //exportacao nomeada

console.log(op.soma(2, 3));
console.log(op.subtracao(5, 3));
console.log(op.nome);
console.log(operacoes2(2, 5));
console.log(divisao(6, 3));
console.log(resto(7, 2));
