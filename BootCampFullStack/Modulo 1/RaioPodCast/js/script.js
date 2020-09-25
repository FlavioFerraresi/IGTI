//window.addEventListener('load', start);
//pode ser substituido colocando o defer no html

var inputCurrentFrequency = document.querySelector('#inputCurrentFrequency');
var rangeFrequencies = document.querySelector('#rangeFrequencies');
var divPodcast = document.querySelector('#divPodcast');

function start() {
  rangeFrequencies.addEventListener('input', handleRangeValueChange);
}

function handleRangeValueChange(event) {
  var currentFrequency = event.target.value;

  inputCurrentFrequency.value = currentFrequency;

  findPodcastFrom(currentFrequency);
}

function findPodcastFrom(frequency) {
  var foundPodcast = null;

  for (var index = 0; index < realPodcasts.length; index++) {
    var currentPodcast = realPodcasts[index];

    if (currentPodcast.id === frequency) {
      foundPodcast = currentPodcast;
      break;
    }
  }

  if (!!foundPodcast) {
    renderPodcast(foundPodcast);
  } else {
    divPodcast.innerHTML = '<p>Nenhum Podcast encontrado</p>';
  }
}

function renderPodcast(podCast) {
  divPodcast.innerHTML = '';

  var img = document.createElement('img');
  img.src = './img/' + podCast.img;

  var title = document.createElement('h2');
  title.textContent = podCast.title;

  var description = document.createElement('p');
  description.textContent = podCast.description;

  divPodcast.appendChild(img);
  divPodcast.appendChild(title);
  divPodcast.appendChild(description);
}

start();
