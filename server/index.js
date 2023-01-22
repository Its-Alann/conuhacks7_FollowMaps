import express from 'express';
const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.get('/getAllTrackInfo', (req, res) => {
  const songs = req.body;
  console.log(songs);
  res.send(songs);
});
