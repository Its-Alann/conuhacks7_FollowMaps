import React, { useState } from 'react';
import Papa from 'papaparse';
import Treemap from './Treemap';

const Artists = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [artistName, setArtistName] = useState([]);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0])
  }

  const handleParse = async () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
        const fileContent = event.target.result;
        const results = await new Promise((resolve) => {
            Papa.parse(fileContent, {
                header: true,
                complete: (results) => {
                    resolve(results);
                }
            });
        });
        setFileData(results.data.map(item => item['Total Streams']));
        setArtistName(results.data.map(item => item['Artist Name']));
    };
    reader.readAsText(file);
  }

  return (
    <>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleParse}>Parse CSV</button>
      {fileData.length ? <Treemap data={[fileData,artistName]} /> : <p>Loading Data</p>}
    </>
  );
}

export default Artists;
