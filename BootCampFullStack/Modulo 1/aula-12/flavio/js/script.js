'use strict'; //o javascript acusa mais erros
window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWoman = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  console.log(marriedMen);
  console.log(marriedWoman);

  //os tres pontos (...) serve para "espalhar" e em seguida concatenar os dois arrays
  const marridPeople = [...marriedMen, ...marriedWoman, { msg: 'oi' }];
  console.log(marridPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2));
  console.log(infiniteSum(1, 2, 1000));
  console.log(infiniteSum(1, 2, 1000, 1, 2, 3, 4, 34, 34, 34, 34, 2, 23));
}

//nesse caso os tres pontos (...) serve para "juntar" os parametros em um array
function infiniteSum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doDestructuring() {
  const first = people.results[0];

  //jeito classico
  //const username = first.login.username;
  //const password = fistt.login.password;

  //usando o destructuring
  const { username, password } = first.login;

  console.log(username);
  console.log(password);
}
