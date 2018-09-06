const express = require('express');
const router = express.Router();
const axios = require('axios');
const Promise = require('bluebird');

async function getArtStories() {
  return axios
    .get('https://artstories.artsmia.org/artstories.json')
    .then(response => response.data.objects)
    .then(artStories => Object.keys(artStories).map(key => artStories[key]))
    .catch(error => {
      console.log(error);
      return {};
    });
}

async function getArtInfo(id) {
  try {
    let artInfo = await axios.get(`https://search.artsmia.org/id/${id}`);
    return artInfo.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function connectArtStories() {
  const artStoryArray = await getArtStories();
  const artInfo = Promise.map(
    artStoryArray,
    async function(story) {
      const info = await getArtInfo(story.id);
      return {
        id: story.id,
        title: story.title,
        description: story.description,
        thumbnailURL: `https://cdn.dx.artsmia.org/thumbs/tn_${
          story.views[0].image
        }`,
        continent: info.continent,
        country: info.country,
        onView: info.room !== 'Not on View'
      };
    },
    {
      concurrency: 10
    }
  );
  return artInfo;
}

router.get('/', async function(req, res) {
  try {
    const art = await connectArtStories();
    res.send(art);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
