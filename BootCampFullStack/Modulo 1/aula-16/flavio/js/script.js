window.addEventListener('load', function () {
  console.log('antes da promise');

  doFetch();
  doFetchAwait();

  console.log('depois da promise');

  executeDivisionPromise();
  executeDivisionPromiseAsincAwait();
});

function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

//criando uma promise
function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject('Não é possivel dividir por 0');
    }
    resolve(a / b);
  });
}

function executeDivisionPromise() {
  divisionPromise(12, 0)
    .then((result) => {
      console.log(result);
    })
    .catch((errorMessage) => {
      console.log('falha na divisao erro: ' + errorMessage);
    });
}

async function executeDivisionPromiseAsincAwait() {
  const division = await divisionPromise(12, 2);
  console.log(division);
}

function doFetch() {
  //.catch para capturar o problema
  //.then para caputar quando da certo
  // quando .then, passa um callback para pegar o retorno da promise resolvida
  fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      //res = resource, nesse é o retorno da promise (response)
      //converte pra res para json, no entanto essa é promise e precisa do .then
      res.json().then((data) => {
        console.log(data);
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisicao');
    });
}

async function doFetchAwait() {
  const res = await fetch('https://api.github.com/users/rrgomide');
  const json = await res.json();
  console.log(json);
}
