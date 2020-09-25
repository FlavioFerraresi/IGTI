'use strict'; //o javascript acusa mais erros
window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

//map - pegar apenas email e nome, e retorna um novo objeto(array nesse caso)
function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });

  console.log(nameEmailArray);
  return nameEmailArray;
}

//filter - filtra os registroe e retorna uma nova lista (novo array nesse caso)
function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

//foreach (percorre vetor e pode adicionar uma novo campo por exemplo)
function doForEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });

  console.log(mappedPeople);
}

//reduce - percorre todo o objeto e realiza alguma conta
//primeiro parametro "acumulador" e o segundo é o objeto corrent
//e o ultimo é o valor inicial, no caso zero
function doReduce() {
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(totalAges);

  //reduce acima, tem a mesma funcionalidade do for
  let sumAges = 0;
  for (let index = 0; index < people.results.length; index++) {
    let current = people.results[index];
    sumAges += current.dob.age;
  }
  console.log(sumAges);
}

//find retona o primeio ( no caso o primeiro de MG)
function doFind() {
  const found = people.results.find((person) => {
    return person.location.state === 'Minas Gerais';
  });
  console.log(found);
}

//some retona se existe ou nao ( no caso de Amazonas)
function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log(found);
}

//every retorna se todos sao ou nao (no caso nat = BR)
function doEvery() {
  const found = people.results.some((person) => {
    return person.nat === 'BR';
  });
  console.log(found);
}

//sort para retornar ordenado
function doSort() {
  const mappedNames = people.results
    .map((person) => {
      //return person.name.first;
      return { name: person.name.first };
    })
    .filter((person) => {
      return person.name.startsWith('A');
    })
    //ordenacao alfabetica
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  //para ordendar pelo tamanho do nome (menor ao maior)
  /*.sort((a, b) => {
      return a.name.length - b.name.length;
    });*/
  //para ordendar pelo tamanho do nome (maior ao menor)
  /*.sort((a, b) => {
      return b.name.length - a.name.length;
    });*/
  console.log(mappedNames);
}
