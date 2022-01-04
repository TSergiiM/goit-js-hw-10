import './css/styles.css';
import API from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  cardConteiner: document.querySelector('.country-info'),
};
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const contryName = event.target.value;
  // console.log(contryName);
  API.fetchCountries(contryName.trim()).then(renderCountryCard);
}

//розмітка карточки країни
function renderCountryCard(response) {
  console.log(response);
  const markup = response
    .map(({ flags, name, population, capital, languages }) => {
      return `
  <h1>
  <img src=${flags.svg} width="65" height="40" alt= ${name.common}> 
  ${name.official}</h1>
  <ul class='list'>
  <li><b>Capital:</b> ${capital}</li>
  <li><b>Population:</b> ${population}</li>
  <li><b>Languages:</b> ${Object.values(languages)}</li
  ></ul>`;
    })
    .join('');
  // console.log(markup);
  refs.cardConteiner.innerHTML = markup;
}
