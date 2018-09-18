const axios = require('axios');
const Promise = require('bluebird');
const https = require('https');
const url = require('url');
const sizeOf = require('image-size');

function getSummary() {
  return (
    axios
      .get('https://artstories.artsmia.org/artstories.json')
      .then(response => response.data.objects)
      // MIA returns object with ref. numbers as keys.
      .then(artStories => Object.keys(artStories).map(key => artStories[key]))
      // Returns as array. Keys are already stored as story.id, so unnecessary.
      .catch(error => {
        console.log(error);
        return [];
      })
  );
}

function getArtInfo(id) {
  return axios
    .get(`https://search.artsmia.org/id/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      return {};
    });
}

function getImageDimensions(urlString) {
  return new Promise((resolve, reject) => {
    const urlObject = new URL(urlString);
    const request = https.get(urlObject, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Failed to load page, status code: ' + response.statusCode)
        );
      }
      const body = [];
      response.on('data', chunk => body.push(chunk));
      response.on('end', () => {
        const dimensions = sizeOf(Buffer.concat(body));
        resolve({
          thumbnailHeight: dimensions.height,
          thumbnailWidth: dimensions.width
        });
      });
      request.on('error', err => reject(err));
    });
  });
}

/**
 * Classification is returned by MIA API as a string containing multiple
 * semicolon-separated entries, one entry, or occasionally none
 * (undefined). Method parses string and returns as an array of strings.
 * @param {string} text
 * @returns {string[]}
 */
function parseClassification(text) {
  return text
    ? text
        .split(';')
        .map(entry => entry.trim())
        .filter(entry => entry)
    : [];
}

/**
 * "Style" is returned by MIA API as a string that can contain one
 * century, two centuries (e.g., "18th or 19th century"), a range
 * of centuries ("8th-11th century"), or none (undefined).
 * Sometimes centuries are BCE. There are occasionally extra spaces.
 * Method parses string and returns as an array of strings.
 * @param {string} text
 * @returns {string[]}
 */
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

function getStories() {
  return getSummary().then(artStoryArray => {
    return Promise.map(
      artStoryArray,
      async story => {
        const src = `https://cdn.dx.artsmia.org/thumbs/tn_${
          story.views[0].image
        }.jpg`;
        const imgDimensions = await getImageDimensions(src);
        const info = await getArtInfo(story.id);
        return {
          src,
          ...imgDimensions,
          id: story.id,
          title: story.title,
          description: story.description,
          thumbnail: src,
          continent: info.continent,
          country: info.country,
          medium: info.medium,
          classification: parseClassification(info.classification),
          century: parseStyle(info.style),
          display: info.room === 'Not on View' ? 'Not On View' : 'On View'
        };
      },
      {
        concurrency: 20
      }
    );
  });
}

module.exports = getStories;
