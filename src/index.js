import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  cardConteiner: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const contryName = event.target.value.trim();
  // console.log(contryName);
  if (contryName === '') {
    return;
  }
  fetchCountries(contryName).then(renderCountryCard).catch(nonExistentCountry);
}

//------------розмітка карточки країни
function renderCountryCard(response) {
  // console.log(response);
  // console.log(response.length);
  //------------якщо знайдено >10 то повідомлення
  if (response.length > 10) {
    refs.countryList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
    // ------------якщо знайдено >2 то рендеримо список буде прапор-країна
  } else if (response.length >= 2) {
    const markup = response
      .map(({ flags, name }) => {
        return `
  <h1>
  <img src=${flags.svg} width="65" height="40" alt= ${name.common}> 
  ${name.official}</h1>`;
      })
      .join('');
    // console.log(markup);
    refs.cardConteiner.innerHTML = '';
    refs.countryList.innerHTML = markup;
    //------------якщо знайдено 1 то редеримо карточку країни
  } else {
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
    refs.countryList.innerHTML = '';
    refs.cardConteiner.innerHTML = markup;
  }
}
//------------опрацьовуємо неіснуючу країну
function nonExistentCountry() {
  Notify.failure('Oops, there is no country with that name');
  refs.countryList.innerHTML = '';
  refs.cardConteiner.innerHTML = '';
}
