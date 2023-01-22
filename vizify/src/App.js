import React, { useState, useEffect } from "react";
import './App.css';
import Artists from './components/Artists';
import FileParser from './components/FileParser';
import Treemap from './components/Treemap';
import Genre from './components/Genre';
import Papa from "papaparse";


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/top50_Spotify_final_data.csv", {
        header: true,
        download: true,
        complete: (results) => {
          console.log(results.data)
          setData(results.data);
        },
    });
    
  }, []);

  return (
    <div>
      {/* <Artists/> */}
      { 
        data.length
        ? <Genre data={data} />
        : <p>Loading data...</p>}
    </div>
  );
}

export default App;
