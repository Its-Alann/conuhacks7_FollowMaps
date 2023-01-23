import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function Tweemap(props) {
  console.log("alan", props.data);

  const hmap = new Map();

  props.data.forEach((item) => {
    const artist = item["Artist Name"];
    hmap.has(artist)
      ? hmap.set(artist, hmap.get(artist) + 1)
      : hmap.set(artist, 1);
  });

  const sortedMap = new Map([...hmap.entries()].sort((a, b) => b[1] - a[1]));

  const artistName2 = Array.from(sortedMap.keys());
  const count = Array.from(sortedMap.values());
  console.log(sortedMap);
  const getMapper = (data) => {
    return data.map((info, index) => {
      //   console.log(info);
      return {
        x: info["artists"] + "",
        y: 500,
      };
    });
  };
  console.log(props.data["imageUrl"]);
  const [series, setSeries] = useState([{ data: getMapper(props.data) }]);
  const [options, setOptions] = useState({
    legend: {
      show: false,
    },
    fill: {
      type: "image",
      image: {
        src: [props.data.map((el) => el.imageUrl)],
        // width: undefined, // optional
        // height: undefined, //optional
      },
    },
    chart: {
      height: 500,
      type: "treemap",
    },
    title: {
      text: "Distibuted Treemap (different color for each cell)",
      align: "center",
    },
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
