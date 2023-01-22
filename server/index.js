import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv'
// require('dotenv').config();
dotenv.config()

const getTrackInfo = async (spotifyApi, title, artist) => {
  const queryString = `track:${title} artist:${artist}`;

  const response = await spotifyApi.searchTracks(queryString);

  // console.log(response.body);

  if (response.body.tracks.items.length === 0) {
    console.log('taaaaake');
    return {
      "title": "OMG",
      "artists": "NewJeans",
      "imageUrl": "https://i.scdn.co/image/ab67616d0000b273d70036292d54f29e8b68ec01",
      "previewLink": "https://p.scdn.co/mp3-preview/23499ad15c1ed3b10c8cd220b652c68a172acb32?cid=07c662fd96b74995b784076c4b440886",
      "genres": [
        "k-pop",
        "k-pop girl group"
      ]
    };
  }

  const imageUrl = response.body.tracks.items[0].album.images[0].url;
  const previewLink = response.body.tracks.items[0].preview_url;

  const artists = response.body.tracks.items[0].album.artists;

  const genreslist = await Promise.all(
    artists.map(async (artist) => {
      let artistId = artist.id;
      let result = await spotifyApi.getArtist(artistId);
      return result.body.genres;
    })
  );

  const genres = genreslist.flat();

  const res = {
    title: response.body.tracks.items[0].name,
    artists: artists[0].name,
    imageUrl: imageUrl,
    previewLink: previewLink,
    genres: genres
  };

  return res;
};

const getAllTrackInfo = async (songs) => {

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  try {
    const tokenData = await spotifyApi.clientCredentialsGrant();
    console.log('The access token expires in ' + tokenData.body['expires_in']);
    console.log('The access token is ' + tokenData.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(tokenData.body['access_token']);
  } catch (err) {
    console.log('Something went wrong when retrieving an access token', err);
  }

  const infos = songs.map((song) =>
    getTrackInfo(spotifyApi, song['title'], song['artist'])
  );

  const songLoop = async () => {
    const res = [];
    for await (const info of infos) {
      res.push(info);
    }
    return res;
  };

  return await songLoop();
};

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 5000

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

app.post('/getAllTrackInfo', async (req, res) => {
  const songs = req.body.songs;

  const jazzykins = await getAllTrackInfo(songs)

  res.status(200).json(jazzykins);
});
