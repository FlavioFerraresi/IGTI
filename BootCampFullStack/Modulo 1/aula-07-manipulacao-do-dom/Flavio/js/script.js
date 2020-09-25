console.log('olá, mundo!');

var title = document.querySelector('h1');
title.textContent = 'mudei';

var cidade = document.querySelector('#city');
cidade.textContent = 'Guariba - SP';

var dadosPessoais = document.querySelector('.data');
console.log(dadosPessoais);

var dadosPessoais2 = document.querySelectorAll('.data');
console.log(dadosPessoais2);
dadosPessoais2 = Array.from(dadosPessoais2);
console.log(dadosPessoais2);

for (var i = 0; i < dadosPessoais2.length; i++) {
  var elementoCorrente = dadosPessoais2[i];
  //elementoCorrente.style.color = 'green';
  elementoCorrente.classList.add('enfase');
}
