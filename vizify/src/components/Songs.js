import React, { useState, useEffect } from "react";
import TreemapSongs from "./TreemapSongs";
import Papa from "papaparse";

function Songs() {
  const [data, setData] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [artistSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    Papa.parse("/top1000_Spotify_final_data.csv", {
      header: true,
      download: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  useEffect(() => {
    setArtistSongs(filterSongsByArtist(artistName, data));
  }, [artistName, data]);

  const filterSongsByArtist = (artistName, data) => {
    return data.filter((song) =>song["Artist Name"] === artistName + " ")
      .map((song) => ({ "Song Name":song["Song Name"], "Total Streams":song["Total Streams"] }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setArtistSongs(filterSongsByArtist(artistName, data));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Choose an artist from above:</label>
        <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)}/>
        {/* <button type="submit">Search</button> */}
      </form>
      {artistSongs.length ? <TreemapSongs data={artistSongs} /> : <p>Loading Data</p>}
    </>
  );
}

export default Songs;
