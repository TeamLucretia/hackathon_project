const express = require('express');
const app = express();
const getStories = require('./modules/getstories');
const PORT = process.env.PORT || 5000;

// Initialize ArtStories data, then listen.
async function initialize() {
  const artStories = await getStories();

  /* Routes */
  app.use('/api/art', (req, res) => {
    res.send(artStories);
  });
  // Serve static files
  app.use(express.static('build'));
  /* Listen */
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

initialize();
