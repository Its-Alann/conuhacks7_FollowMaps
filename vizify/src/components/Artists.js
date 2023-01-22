import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Treemap from './Treemap';

const Artists = () => {

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

  const streams = data.map(item => item['Total Streams'])
  const artistName = data.map(item => item['Artist Name'])

// setFileData(data.map(item => item['Total Streams']));
// setArtistName(data.map(item => item['Artist Name']));


return (
    <>
    {/* {console.log(data.map(item => item['Total Streams']))} */}
      {data.length ? <Treemap data={[streams,artistName]} /> : <p>Loading Data</p>}
    </>
  );
}

export default Artists;
