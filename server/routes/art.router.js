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
  let art = [];
  for (piece in artStories) {
    console.log(piece);
    let pieceInfo = {};
    pieceInfo.id = piece;
    pieceInfo.story = artStories[piece];
    try {
      // let info = await axios.get(`https://search.artsmia.org/id/${piece.id}`);
      // pieceInfo.info = info.data
    } catch (error) {
      console.log(error);
    }
    art.push(pieceInfo);
  }
  console.log(art);
  return art;
};

router.get('/', async function (req, res) {
  try {
    const art = await connectArtStories();
    console.log('3. got art stories')
    res.send(art);
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

module.exports = router;