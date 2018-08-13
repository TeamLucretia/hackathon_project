const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getArtStories() {
  try {
    const artStories = await axios.get('https://artstories.artsmia.org/artstories.json');
    return artStories.data.objects;
  } catch(error) {
    console.log(error);
    return {};
  }
};

async function connectArtStories() {
  const artStories = await getArtStories();
  console.log('2. in connect')
  return artStories;
};

router.get('/', async function (req, res) {
  const art = await connectArtStories();
  console.log('3. got art stories')
  res.send(art);
});

module.exports = router;