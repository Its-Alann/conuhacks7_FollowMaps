import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Tweemap(props) {
  console.log("alan", props.data);

  const hmap = new Map();

  props.data.forEach((item) => {
    const artist = item["artists"];
    hmap.has(artist)
      ? hmap.set(artist, hmap.get(artist) + 1)
      : hmap.set(artist, 1);
  });
  const sortedMap = new Map([...hmap.entries()].sort((a, b) => b[1] - a[1]));
  console.log(sortedMap);

  //   const artistNameData = props.data;
  //   const fileData = props.data[1];
  //   //   const mapper = artistNameData.map((info) => {
  //   //     return {
  //   //       x: info["artists"] + "",
  //   //       y: 500,
  //   //     };
  //   //   });

  const getMapper = (data) => {
    return data.map((info, index) => {
      //   console.log(info);
      return {
        x: info["artists"] + "",
        y: sortedMap[info["artists"]],
      };
    });
  };
  const [series, setSeries] = useState([{ data: getMapper(props.data) }]);
  const [options, setOptions] = useState({
    legend: {
      show: false,
    },
    chart: {
      height: 500,
      type: "treemap",
    },
    title: {
      text: "Distibuted Treemap (different color for each cell)",
      align: "center",
    },
    colors: [
      "#3B93A5",
      "#F7B844",
      "#ADD8C7",
      "#EC3C65",
      "#CDD7B6",
      "#C1F666",
      "#D43F97",
      "#1E5D8C",
      "#421243",
      "#7F94B0",
      "#EF6537",
      "#C0ADDB",
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  });

  useEffect(() => {
    const mapper = getMapper(props.data);
    setSeries([{ data: mapper }]);
  }, [props.data]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="treemap"
            width="1300"
          />
        </div>
      </div>
    </div>
  );
}

export default Tweemap;
