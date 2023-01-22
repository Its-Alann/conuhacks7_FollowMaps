import React, { useState } from 'react';
import Papa from 'papaparse';
import Treemap from './Treemap';

const Artists = () => {
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0])
  }

  const handleParse = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      Papa.parse(fileContent, {
        header: true,
        complete: (results) => {
          console.log(results.data.map(item => item['Top 10 (xTimes)']));
        }
      });
    };
    reader.readAsText(file);
  }

  return (
    <>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleParse}>Parse CSV</button>
      <Treemap/>
    </>
  );
}

export default Artists;
