import React, {useState} from 'react'
import Papa from 'papaparse'
const FileParser = () => {
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
            console.log(results.data);
          }
        });
      };
      reader.readAsText(file);
    }
  
    return (
      <>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleParse}>Parse CSV</button>
      </>
    );
}

export default FileParser