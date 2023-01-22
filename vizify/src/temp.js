import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const getTrackInfo = async (title, artist) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    async (data) => {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    (err) => {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

  const { tokenData, error } = await spotifyApi.clientCredentialsGrant();

  if (tokenData) {
    console.log('The access token expires in ' + tokenData.body['expires_in']);
    console.log('The access token is ' + tokenData.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(tokenData.body['access_token']);
  } else if (error) {
    console.log('Something went wrong when retrieving an access token', error);
  }

  const queryString = `track:${title} artist:${artist}`;
  const searchData = await spotifyApi.searchTracks(queryString, { limit: 1 });
  console.log(searchData.body.tracks?.items[0]);
  console.log(searchData.body.tracks?.items[0]);
  console.log(searchData.body.tracks?.items[0]);
};

getTrackInfo('munch', 'ice spice');

export default getTrackInfo;
