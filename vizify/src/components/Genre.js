import React, { useState, useEffect } from "react";
import Treemap from "./Treemap";
import Papa from "papaparse";

function Genre() {
  const [data, setData] = useState([]);

  const url = 'http://localhost:3000/getAllTrackInfo'

  useEffect(() => {
    Papa.parse("/top50_Spotify_final_data.csv", {
      header: true,
      download: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

//   const songs = data.forEach((item) => {
//     const artist = item["Artist Name"];
//     // hmap.has(artist)
//     //   ? hmap.set(artist, hmap.get(artist) + 1)
//     //   : hmap.set(artist, 1);
//     console.log(songs)
//   });
  
const songName = data.map(item => item['Song Name'])
const artistName = data.map(item => item['Artist Name'])
const combineArray = songName.map((elem1, i) => ({title: elem1, artist: artistName[i]}))
  
//   const sortedMap = new Map([...hmap.entries()].sort((a, b) => b[1] - a[1]));

//   const artistName2 = Array.from(sortedMap.keys());
//   const count = Array.from(sortedMap.values());
  
  const getInfo = async () => {
    const response = await fetch(url, {
        body: JSON.stringify({
            songs: combineArray
        })
    })
    console.log(response.json())
  }

  return (
    <>
      {data.length ? <Treemap data={[songName,artistName]} /> : <p>Loading Data</p>}
    </>
  );
}

export default Genre;
