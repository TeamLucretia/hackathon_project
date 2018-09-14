const express = require('express');
const router = express.Router();
const axios = require('axios');
const Promise = require('bluebird');

async function getArtStories() {
  return (
    axios
      .get('https://artstories.artsmia.org/artstories.json')
      .then(response => response.data.objects)
      // MIA returns object with ref. numbers as keys.
      .then(artStories => Object.keys(artStories).map(key => artStories[key]))
      // Returns as array. Keys are already stored as story.id, so unnecessary.
      .catch(error => {
        console.log(error);
        return {};
      })
  );
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

function parseClassification(text) {
  return text
    ? text
        .split(';')
        .map(entry => entry.trim())
        .filter(entry => entry)
    : [];
}

function parseStyle(text) {
  const singleCenturyBCE = /^\d+(st|nd|rd|th)\scentury\sBCE$/i;
  const singleCenturyAD = /^\d+(st|nd|rd|th)\scentury$/i;
  if (!text) {
    return [];
  } else if (singleCenturyBCE.test(text) || singleCenturyAD.test(text)) {
    return [text];
  } else {
    const isBCE = /BCE/.test(text);
    const centuryRange = text
      .match(/\d+/g)
      .map(str => parseInt(str))
      .sort((a, b) => a - b);
    const centuryArray = [];
    for (let i = centuryRange[0]; i <= centuryRange[1]; i++) {
      let ordinal;
      if (i === 11 || i === 12 || i === 13) {
        ordinal = 'th';
      } else {
        switch (i % 10) {
          case 1:
            ordinal = 'st';
            break;
          case 2:
            ordinal = 'nd';
            break;
          case 3:
            ordinal = 'rd';
            break;
          default:
            ordinal = 'th';
        }
      }
      const centuryName =
        i.toString() + ordinal + ' century' + (isBCE ? ' BCE' : '');
      centuryArray.push(centuryName);
    }
    return centuryArray;
  }
}

async function connectArtStories() {
  const artStoryArray = await getArtStories();
  const artInfo = Promise.map(
    artStoryArray,
    async function(story) {
      const info = await getArtInfo(story.id);
      const src = `https://cdn.dx.artsmia.org/thumbs/tn_${
        story.views[0].image
      }.jpg`;
      // info.classification can contain multiple entries, one entry, or none
      // (undefined).
      // info.style can be one century, two centuries, a range of centuries, or
      // none (undefined).
      // Thumbnail size is also sometimes undefined.
      // These need to be parsed.
      return {
        src,
        id: story.id,
        title: story.title,
        description: story.description,
        thumbnail: src,
        thumbnailHeight: info.image_height || 200,
        thumbnailWidth: info.image_width || 200,
        continent: info.continent,
        country: info.country,
        medium: info.medium,
        classification: parseClassification(info.classification),
        century: parseStyle(info.style),
        onView: info.room !== 'Not on View' ? 'On View' : 'Not On View'
      };
    },
    {
      concurrency: 20
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
