function fetchCountries(contryName) {
  const searchParams = new URLSearchParams({
    fields: 'capital,flags,languages,name,population',
  });

  const url = `https://restcountries.com/v3.1/name/${contryName}?${searchParams}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(response => {
      // Data handling
      return response;
    })
    .catch(error => {
      console.log(error);
      // Error handling
    });
}

export default { fetchCountries };
