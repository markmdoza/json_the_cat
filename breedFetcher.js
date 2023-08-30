const request = require('request');

// Write the logic in breedFetcher.js to fetch the Siberian data from the API endpoint using request.
const apiURL = `https://api.thecatapi.com/v1/breeds/search`

// Allow user to get breed name from command line arguments.
const breedName = process.argv[2];

if (!breedName) {
  console.log('Please provide a breed namd');
  process.exit(1);
}

// Make a request to the API
request(`${apiURL}?q=${breedName}`, (error, response, body) => {
  if (error) {
    console.error('There was an error making the request:', error);
    return;
  }

  if (response.statusCode != 200) {
    console.error('Request failed with status code:', response.statusCode);
    return;
  }

try {
  const data = JSON.parse(body);

  if (data.length === 0) {
    console.log(`Breed "${breedName}" not found.`);
  } else {
    const breed = data[0];
    console.log(breed.description);
  }
} catch (parseError) {
  console.error('Error parsing JSON:', parseError);
}
});
