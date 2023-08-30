const request = require('request');

app.use(request);

// Write the logic in breedFetcher.js to fetch the Siberian data from the API endpoint using request.
const apiURL = 'https://api.thecatapi.com/v1/breeds/search?q=sib'

// Allow user to get breed name from command line arguments.
const breedName = process.argv[2];

if (!breedName) {
  console.log('Please provide a breed namd');
  process.exit(1);
}

// Make a request to the API
request(apiURL, (error, response, body) => {
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

  // Find breed name in data array
  const breed = data.find(entry => entry.name === breedName);

  if (breed) {
    console.log(breed.description);
  } else {
    console.log(`Breed "${breedName}" not found.`);
  }
} catch (parseError) {
  console.error('Error parsing JSON:', parseError);
}
});
