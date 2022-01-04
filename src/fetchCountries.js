function fetchCountries(contryName) {
  const searchParams = new URLSearchParams({
    fields: 'capital,flags,languages,name,population',
  });

  const url = `https://restcountries.com/v3.1/name/${contryName}?${searchParams}`;

  return fetch(url).then(response => {
    // console.log(response);
    return response.json();
  });
}

export { fetchCountries };
