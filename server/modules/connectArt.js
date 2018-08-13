const axios = require('axios');
const getArtStories = require('./getArtStories');

const connectArtStories = () => {
  const artStories = getArtStories();
};

module.exports = connectArtStories;