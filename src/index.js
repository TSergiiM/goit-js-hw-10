import './css/styles.css';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = { input: document.querySelector('#search-box') };
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

//функція зчитує інпут юзера
function onInput(event) {
  const name = event.target.value;
  console.log(name);
  fetchCountries(name);
}
function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      // Data handling
    })
    .catch(error => {
      // Error handling
    });
}
