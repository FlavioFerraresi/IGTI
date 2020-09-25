window.addEventListener('load', start);

var globalNames = ['um', 'dois', 'tres', 'quatro'];
var globalInputName = null;
var globalIsEditing = false;
var globalCurrentIndex = null;

function start() {
  globalInputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(name) {
    globalNames.push(name);
    render();
  }

  function updateName(name) {
    globalNames[globalCurrentIndex] = name;
    render();
  }

  function handleTyping(event) {
    // !! torna algo verdadeiravel como true ou inverso
    var hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === 'Enter') {
      if (globalIsEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      globalIsEditing = false;
      clearInput;
    }
  }
  globalInputName.focus();
  globalInputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      globalInputName.value = name;
      globalInputName.focus();
      globalIsEditing = true;
      globalCurrentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  //criar ul
  //fazer n li's, conforme de globalNanes
  var ul = document.createElement('ul');

  for (let index = 0; index < globalNames.length; index++) {
    var currentName = globalNames[index];

    var li = document.createElement('li');
    var button = createDeleteButton(index);

    var span = createSpan(currentName, index);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  globalInputName.value = '';
  globalInputName.focus();
}
