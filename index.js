const express = require('express');
const igdb = require('igdb-api-node').default;
const client = igdb('11c2fc7bbc3762380a286083b1199471');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;
const apicache = require('apicache');
const cache = apicache.middleware;

app.listen(PORT, error => {
  error ? console.error(error) : console.info(`Running on http://localhost:${PORT}/`)
});

app.use(cache('1 day'), express.static(path.join(__dirname, 'dist'), (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
}));

app.get('/api/search', function (req, res) {
  client.games({
      limit: 10,  
      offset: 0,
      search: req.query.gameName
  }, ['id', 'name']).then(
    response => { res.send(response) }
  )
});

app.get('/api/game/:gameId', function (req, res) {
  const fields = [
    'id', 'name', 'summary', 'storyline',
    'developers', 'publishers', 'release_dates', 'screenshots', 'cover', 'genres'
  ];
  client.games({
      ids: [ req.params.gameId ],
      expand: ['genres', 'developers', 'publishers']
  }, fields).then(
    response => { res.send(response) }
  );
});

app.get('/api/platform/:platformIds', (req, res) => {
  client.platforms({ 
      ids: req.params.platformIds.split(',')
    }, ['name']).then(response => { res.send(response) });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
