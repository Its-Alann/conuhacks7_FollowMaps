import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Treemap from './Treemap';

const Genre = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse('/top50_Spotify_final_data.csv', {
        header: true,
        download: true,
        complete: (results) => {
            setData(results.data);
        }
    });
  }, []); 

  return (
    <>
      {console.log(data)}
      <Treemap data={data}/>
    </>
  );
}

export default Genre;