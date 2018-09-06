const express = require('express');
const router = express.Router();
const axios = require('axios');
const Promise = require('bluebird');

async function getArtStories() {
  try {
    const artStories = await axios.get(
      'https://artstories.artsmia.org/artstories.json'
    );
    return artStories.data.objects;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function newGetArtStories() {
  return axios
    .get('https://artstories.artsmia.org/artstories.json')
    .then(response => response.data.objects)
    .then(artStories => Object.keys(artStories).map(key => artStories[key]))
    .catch(error => {
      console.log(error);
      return {};
    });
}

async function newGetArtInfo(id) {}

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
  const artStories = await getArtStories();
  const newArtStories = await newGetArtStories();
  let art = [];
  for (piece in artStories) {
    let pieceInfo = {};
    pieceInfo.id = piece;
    pieceInfo.story = artStories[piece];
    pieceInfo.info = await getArtInfo(piece);
    try {
      // let info = await axios.get(`https://search.artsmia.org/id/${piece.id}`);
      // pieceInfo.info = info.data
    } catch (error) {
      console.log(error);
    }
    art.push(pieceInfo);
  }
  return art;
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
