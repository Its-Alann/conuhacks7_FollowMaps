import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const getTrackInfo = async (spotifyApi, title, artist) => {
  const queryString = `track:${title} artist:${artist}`;

  const response = await spotifyApi.searchTracks(queryString);

  // console.log(response.body);

  if (response.body.tracks.items.length === 0) {
    console.log('taaaaake');
    return null;
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
  // console.log(res);
  return res;
};

const getAllTrackInfo = (arr) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  spotifyApi
    .clientCredentialsGrant()
    .then(
      async function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
      },
      function (err) {
        console.log(
          'Something went wrong when retrieving an access token',
          err
        );
      }
    )
    .then(() => {
      const res = Promise.all(
        arr.map(async (song) => {
          return await getTrackInfo(spotifyApi, song['title'], song['artist']);
        })
      );
      console.log(res);
      return res;
    });
};

const songs = [
  { title: 'walk it talk it', artist: 'migos' },
  { title: 'omg', artist: 'newjeans' }
];

getAllTrackInfo(songs).then(console.log);
