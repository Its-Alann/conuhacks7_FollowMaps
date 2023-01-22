import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Treemap from './Treemap';

const Artists = () => {

  const [data, setData] = useState([]);
    useEffect(() => {
      Papa.parse("/top50_Spotify_final_data.csv", {
        download: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    }, []);
  
    const hmap = new Map();
  
    data.forEach((item) => {
      const artist = item["Artist Name"];
      hmap.has(artist)
        ? hmap.set(artist, hmap.get(artist) + 1)
        : hmap.set(artist, 1);
    });
  
    const sortedMap = new Map([...hmap.entries()].sort((a, b) => b[1] - a[1]));
  
    const artistName2 = Array.from(sortedMap.keys());
    const count = Array.from(sortedMap.values());
  
    return (
      <>
        {hmap.size ? <Treemap data={[artistName2, count]} /> : <p>Loading Data</p>}
      </>
    );
}

export default Artists;
