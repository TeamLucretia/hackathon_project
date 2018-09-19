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

### Development Instructions

This project was bootstrapped with [`create-react-app`](https://github.com/facebookincubator/create-react-app), using the TypeScript (`--scripts-version=react-scripts-ts`) flag. To start contributing, you should _not_ need to install `create-react-app` if you don't already have it. You _will_ need to install Node.js ^10.0 and `nodemon`.

Once you have cloned the repository and run `npm install`, you can simulataneously develop the server and client by running

```shell
$ npm run server
```

in one terminal instance and

```shell
$ npm run client
```

in the other. This will start the server listening on port 5000, and will serve client-side React content on port 3000 (via `webpack-dev-server`), proxied to 5000. The React server will auto-open a browser to localhost:3000. Hot-reloading is enabled in both servers.
