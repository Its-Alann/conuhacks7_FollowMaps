import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
import BodyParser from 'body-parser';

dotenv.config();
const bodyParser = BodyParser;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  async function (data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

    const response = await spotifyApi.searchTracks('artist: Drake');
    console.log(response.body);
    console.log(response.body.items.value);
  },
  function (err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);
