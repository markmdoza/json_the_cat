const { fetchBreedDescription } = require('./breedFetcher');

const breedName = process.argv[2];

const fetchBreedDescription = function(breedName, (error, description) => {
  if (error) {
    console.log('Error fetching breed name:', error)
  } else {
    console.log(description);
  }
});

module.exports = { fetchBreedDescription };