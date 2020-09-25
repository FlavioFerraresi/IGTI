window.addEventListener('load', start);

let inputRed = null,
  inputGreen = null,
  inputBlue = null,
  rangeRed = null,
  rangeGreen = null,
  rangeBlue = null,
  divSquare = null;

function start() {
  divSquare = document.querySelector('#square');

  inputRed = document.querySelector('#inputRed');
  inputGreen = document.querySelector('#inputGreen');
  inputBlue = document.querySelector('#inputBlue');

  rangeRed = document.querySelector('#rangeRed');
  rangeGreen = document.querySelector('#rangeGreen');
  rangeBlue = document.querySelector('#rangeBlue');

  rangeRed.addEventListener('input', setColor);
  rangeGreen.addEventListener('input', setColor);
  rangeBlue.addEventListener('input', setColor);

  setColor();
}

function setColor() {
  const red = +rangeRed.value;
  const green = +rangeGreen.value;
  const blue = +rangeBlue.value;

  inputRed.value = red;
  inputGreen.value = green;
  inputBlue.value = blue;

  divSquare.style.backgroundColor = `rgb(${red},${green},${blue})`;
}
