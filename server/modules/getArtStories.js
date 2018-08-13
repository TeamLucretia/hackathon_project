const axios = require('axios');

const getArtStories = () => {
  let artStories = {};
  axios.get('https://artstories.artsmia.org/artstories.json'
  ).then((response) => {
    artStories = response.data.objects;
  }).catch((error) => {
    console.log(error);
  });
  return artStories;
}


module.exports = getArtStories;