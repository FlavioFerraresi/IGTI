window.addEventListener('load', start);

var gInputRed = null;
var gInputGreen = null;
var gInputBlue = null;
var gInputRedText = null;
var gInputGreenText = null;
var gInputBlueText = null;

function start() {
  gInputRed = document.querySelector('#inputRed');
  gInputGreen = document.querySelector('#inputGreen');
  gInputBlue = document.querySelector('#inputBlue');

  gInputRedText = document.querySelector('#inputRedText');
  gInputGreenText = document.querySelector('#inputGreenText');
  gInputBlueText = document.querySelector('#inputBlueText');

  //  preventFormSubmit();
  activateInput();
}
/*
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}
*/
function activateInput() {
  function updRed(event) {
    gInputRedText.value = event.target.value;
    updSquare();
  }
  function updGreen(event) {
    gInputGreenText.value = event.target.value;
    updSquare();
  }
  function updBlue(event) {
    gInputBlueText.value = event.target.value;
    updSquare();
  }
  function updSquare() {
    var squareColor = document.querySelector('#squareColor');
    squareColor.style.backgroundColor = `rgb(${gInputRedText.value},${gInputGreenText.value},${gInputBlueText.value})`;
  }

  gInputRed.addEventListener('change', updRed);
  gInputGreen.addEventListener('change', updGreen);
  gInputBlue.addEventListener('change', updBlue);
  updSquare();
}
