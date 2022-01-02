import './css/styles.css';
import API from './fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = { input: document.querySelector('#search-box') };
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

//функція зчитує інпут юзера
function onInput(event) {
  const name = event.target.value;
  console.log(name);
  API.fetchCountries(name);
}
