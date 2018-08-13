const axios = require('axios');

async function getArtStories() {
  let artStories = {};
  axios.get('https://artstories.artsmia.org/artstories.json'
  ).then((response) => {
    console.log("In getArtStories");
    artStories = response.data;
    return artStories;
  }).catch((error) => {
    console.log(error);
    return {};
  });
}


module.exports = getArtStories;