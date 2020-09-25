window.addEventListener('load', start); //sem () pois so vai ser executada no onload

function start() {
  console.log('pagina carregada');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function countName(event) {
  var count = event.target.value;
  var span = document.querySelector('#nameLength');
  span.textContent = `${count.length} caracteres`;
}

function preventSubmit(event) {
  event.preventDefault(); //evita que a pagina seja recarregada
  //single page aplication

  var nameInput = document.querySelector('#nameInput');
  alert(`${nameInput.value} cadastrado com sucesso!`);
}
