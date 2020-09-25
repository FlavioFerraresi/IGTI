let globalNames = ['um', 'dois', 'tres', 'quatro'];
let globalInputName = null;
let globalIsEditing = false;
let globalCurrentIndex = null;

window.addEventListener('load', () => {
  globalInputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(name) {
    //globalNames.push(name);
    //usando spread
    globalNames = [...globalNames, name];
    render();
  }

  function updateName(name) {
    globalNames[globalCurrentIndex] = name;
    render();
  }

  function handleTyping(event) {
    // !! torna algo verdadeiravel como true ou inverso
    const hasText = !!event.target.value && event.target.value.trim() !== '';

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
      //globalNames.splice(index, 1);

      //utilizando o filter
      //globalNames = globalNames.filter((name, i) => {
      /*if (i === index) {
          return false;
        }*/
      //return i !== index;
      //});

      //mais elegante e menos codigo
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }
    let button = document.createElement('button');
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

    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  //criar ul
  //fazer n li's, conforme de globalNanes
  let ul = document.createElement('ul');

  for (let index = 0; index < globalNames.length; index++) {
    let currentName = globalNames[index];

    let li = document.createElement('li');
    let button = createDeleteButton(index);

    let span = createSpan(currentName, index);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

/*function clearInput() {
  globalInputName.value = '';
  globalInputName.focus();
}*/
//trocando para arrow function
const clearInput = () => {
  globalInputName.value = '';
  globalInputName.focus();
};
