const axios = require('axios');

async function getArtStories() {
  let artStories = {};
  axios.get('https://artstories.artsmia.org/artstories.json'
  ).then((response) => {
    console.log("1. In getArtStories");
    artStories = response.data;
    return artStories;
  }).catch((error) => {
    console.log(error);
    return {};
  });
};

async function connectArtStories() {
  const artStories = await getArtStories();
  console.log('2. in connect')
  return artStories;
};

module.exports = connectArtStories;