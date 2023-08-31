const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  const apiURL = 'https://api.thecatapi.com/v1/breeds/search';

  if (!breedName) {
    callback('Please provide a breed name', null);
    return;
  }

  request(`${apiURL}?q=${breedName}`, (error, response, body) => {
    if (error) {
      callback('There was an error making the request:', null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(`Request failed with status code: ${response.statusCode}`, null);
      return;
    }

    try {
      const data = JSON.parse(body);
      if (data.length === 0) {
        callback(`Breed "" not found.`, null);
      } else {
        const breed = data[0];
        callback(null, breed.description);
      }
    } catch (parseError) {
      callback('Error parsing JSON:', null);
    }
  });
};

module.exports = { fetchBreedDescription };