//estado da aplicacao (state)
let tabContries = null;
let tabFavorites = null;
let allCountries = [];
let favoriteContries = [];
let countCountries = 0;
let countFavorites = 0;
let totalPopulationList = 0;
let totalPopulationFavorites = 0;
let numberFormat = null;

window.addEventListener('load', () => {
  tabContries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');
  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector(
    '#totalPopulationFavorites'
  );

  numberFormat = Intl.NumberFormat('pt-BR');

  fetchCountries();
});

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map((country) => {
    //destruction para eliminar a chamada de "country."
    const { numericCode, translations, population, flag } = country;
    return {
      id: numericCode,
      name: translations.pt,
      population, //pode elimiar um quando tiver o mesmo nome (population: population)
      formattedPopulation: formatNumber(population),
      flag: flag,
    };
  });

  //coloquei esse trecho pois estava ordenando pelo nome, e nao pela tradução em portugues
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  render();
}

function render() {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
}

function renderCountryList() {
  let countriesHTML = '<div>';

  allCountries.forEach((country) => {
    const { name, flag, id, formattedPopulation } = country;

    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn">+</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;
    countriesHTML += countryHTML;
  });

  countriesHTML += '</div>';

  tabContries.innerHTML = countriesHTML;
}

function renderFavorites() {
  let favoritesHTML = '<div>';

  favoriteContries.forEach((country) => {
    const { name, flag, id, formattedPopulation } = country;

    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${formattedPopulation}</li>
          </ul>
        </div>
      </div>
    `;
    favoritesHTML += favoriteCountryHTML;
  });

  favoritesHTML += '</div>';

  tabFavorites.innerHTML = favoritesHTML;
}
function renderSummary() {
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = favoriteContries.length;

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  const totalFavorites = favoriteContries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent = formatNumber(totalFavorites);
}

function handleCountryButtons() {
  const countryButtons = Array.from(tabContries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach((button) => {
    button.addEventListener('click', () => addToFavorites(button.id));
  });

  favoriteButtons.forEach((button) => {
    button.addEventListener('click', () => removeFromFavorites(button.id));
  });
}

function addToFavorites(id) {
  const countryToAdd = allCountries.find((country) => country.id === id);

  favoriteContries = [...favoriteContries, countryToAdd];
  favoriteContries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter((country) => country.id !== id);

  render();
}

function removeFromFavorites(id) {
  const countryToRemove = favoriteContries.find((country) => country.id === id);

  allCountries = [...allCountries, countryToRemove];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  favoriteContries = favoriteContries.filter((country) => country.id !== id);

  render();
}

function formatNumber(number) {
  return numberFormat.format(number);
}
