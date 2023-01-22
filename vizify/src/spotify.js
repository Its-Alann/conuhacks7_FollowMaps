import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";


dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  async function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);

    const response = await spotifyApi.searchTracks(
      "artist:Drake track:BackOutsideBoyz"
    );
    // console.log(response.body.tracks.items[0].preview_url);
    // console.log(response.body.tracks.items[0].album.images[0].url);
      
    const artists = response.body.tracks.items[0].album.artists;
    console.log(artists)
    const res = await Promise.all(artists.map(async (artist) => {
      let artistId = artist.id
      let result = await spotifyApi.getArtist(artistId);
      return result.body.genres;
    }));
    let genres = []
    res.forEach((item) => {
    genres = genres.concat(item);
});
console.log(genres)
  },
  
  function (err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);
