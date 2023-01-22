import React, { useState, useEffect } from "react";
import Treemap from "./Treemap";

function Genre(props) {
  const [dataPack, setDataPack] = useState([]);

  const url = 'http://localhost:5000/getAllTrackInfo'


  useEffect(() => {
    const getInfo = async () => {

        console.log('data', props.data)
        const songName = props.data.map(item => ({title: item['Song Name'], artist: item['Artist Name']}))

        console.log('song', songName)
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                // songs: data.map(item => ({title: item['Song Name'], artist: item['Artist Name']}))
                songs: songName
            }),
            headers: {'Content-Type': 'application/json'}
        })
        const dataPack2 = await response.json()
        console.log('haiiii', dataPack2);
        setDataPack(dataPack2)
    }

    getInfo()
    
  }, []);

//   useEffect(() => {
//       getInfo().then((data) => {
//         console.log('yeye', data)
//         setDataPack(data)
//       });
//         setDataPack('hai')
//   }, [data]);
  
//   const getInfo = async () => {
//     const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({
//             songs: data.map(item => ({title: item['Song Name'], artist: item['Artist Name']}))
//         }),
//         headers: {'Content-Type': 'application/json'}
//     })
//     const dataPack2 = await response.json()
//     console.log('haiiii', dataPack2)
//     return dataPack2
//   }

    // const getInfo = async () => {
    //     await fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //         songs: data.map(item => ({title: item['Song Name'], artist: item['Artist Name']}))}),
    //         headers: {'Content-Type': 'application/json'}

    // })}

    return (
        <>
         {dataPack ? <Treemap data={dataPack} /> : <p>
        ur mom Data</p>}
        </>
    );
}

export default Genre;
