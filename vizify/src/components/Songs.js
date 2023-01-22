import React, { useState, useEffect } from "react";
import TreemapSongs from "./TreemapSongs";
import Papa from "papaparse";

function Songs() {
  const [data, setData] = useState([]);


  useEffect(() => {
    Papa.parse("/top1000_Spotify_final_data.csv", {
      header: true,
      download: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  const drakeSongs = (data.filter((song) => song["Artist Name"] === 'Drake ')
  .map((song) => ({ "Song Name": song["Song Name"], "Total Streams": song["Total Streams"] })));
//   console.log(drakeSongs)

  return (
    <>
      {drakeSongs.length ? <TreemapSongs data={drakeSongs} /> : <p>Loading Data</p>}
    </>
  );
}

export default Songs;
