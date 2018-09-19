## MIA ArtStories

(_hosted at https://boiling-brook-23506.herokuapp.com/_)

Submission to Prime Academy Hackathon, September 6th, 2018. Introduces search/filter tools to the [Minneapolis Art Institute's ArtStories webpage](https://artstories.artsmia.org/#/). In our functional re-design, ArtStories can be filtered by time period, geography, or medium, and are displayed in a 2D grid. Although the main focus of this project was a front-end redesign, the project incorporates a Node/Express server which calls the [artstories.artsmia.org](https://github.com/artsmia/artstories.md) and [search.artsmia.org](https://github.com/artsmia/collection-elasticsearch) APIs on startup, and pre-formats the data prior to serving to clients.

### Technologies

- ReactJS
- TypeScript
- MobX (implemented, then removed; see [`mobx`](https://github.com/TeamLucretia/hackathon_project/tree/mobx) branch for implementation)
- Node.js
- Express

### Contributors

- [Ellen Keal](https://github.com/llenk)
- [Andy Taton](https://github.com/tataton)
- [Drew Wiskus](https://github.com/andrewwiskus)
- [Jesse Wrobleski](https://github.com/Jessewroblewski)
