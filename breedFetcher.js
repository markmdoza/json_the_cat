const request = require('request')

const fetchBreedDescription = function (breedName, callback) {
  const apiURL = 'https://api.thecatapi.com/v1/breeds/search'

  request(`${apiURL}?q=${breedName}`, (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }

    if (response.statusCode !== 200) {
      callback(new Error(`Request failed with status code: ${response.statusCode}`), null)
      return
    }

    try {
      const data = JSON.parse(body)
      if (data.length === 0) {
        callback(null, `${breedName} not found.`)
      } else {
        const breed = data[0]
        callback(null, breed.description)
      }
    } catch (parseError) {
      callback(parseError, null)
    }
  })
}

module.exports = { fetchBreedDescription }
