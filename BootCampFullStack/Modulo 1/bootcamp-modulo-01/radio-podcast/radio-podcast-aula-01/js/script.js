//window.addEventListener('load', start);
// substituí por "defer"

var inputCurrentFrequency = document.querySelector('#inputCurrentFrequency');
var rangeFrequencies = document.querySelector('#rangeFrequencies');
var divPodcast = document.querySelector('#divPodcast');

function start() {
  rangeFrequencies.addEventListener('input', handleRangeValueChange);
}

function handleRangeValueChange(event) {
  var currentFrequency = event.target.value;

  setInputCurrentFrequencyValue(currentFrequency);
  findPodcastFrom(currentFrequency);
}

function setInputCurrentFrequencyValue(value) {
  inputCurrentFrequency.value = value;
}

function findPodcastFrom(frequency) {
  var foundPodcast = null;

  for (var i = 0; i < realPodcasts.length; i++) {
    var currentPodcast = realPodcasts[i];

    if (currentPodcast.id === frequency) {
      foundPodcast = currentPodcast;
      break;
    }
  }

  if (!!foundPodcast) {
    renderPodcast(foundPodcast);
  } else {
    divPodcast.innerHTML = '<p>Nenhum podcast encontrado</p>';
  }
}

function renderPodcast(podcast) {
  divPodcast.innerHTML = '';

  var img = document.createElement('img');
  img.src = './img/' + podcast.img;
  img.alt = 'Logo do podcast ' + podcast.title;
  img.title = podcast.title;

  var title = document.createElement('h2');
  title.textContent = podcast.title;

  var description = document.createElement('p');
  description.textContent = podcast.description;

  divPodcast.appendChild(img);
  divPodcast.appendChild(title);
  divPodcast.appendChild(description);
}

start();
