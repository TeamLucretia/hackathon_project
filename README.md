## MIA ArtStories

(_hosted at [https://boiling-brook-23506.herokuapp.com/]_)

Introduces search/filter tools to the [Minneapolis Art Institute's ArtStories webpage](https://artstories.artsmia.org/#/). In our functional re-design, ArtStories can be filtered by time period, geography, or medium, and are displayed in a 2D grid. Although the main focus of this project was a front-end redesign, the project incorporates a Node/Express server which calls the [artstories.artsmia.org](https://github.com/artsmia/artstories.md) and [search.artsmia.org](https://github.com/artsmia/collection-elasticsearch) APIs on startup, and pre-formats the data prior to serving to clients.

### Technologies

- ReactJS
- TypeScript
- MobX (implemented, then removed; see [`mobx`](https://github.com/TeamLucretia/hackathon_project/tree/mobx) branch for implementation)
- Node.js
- Express

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), using the [react-scripts-ts](https://github.com/Microsoft/TypeScript-React-Starter) TypeScript workflow.
