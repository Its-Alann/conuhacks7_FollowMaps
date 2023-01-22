import React, { Component } from "react";
import Chart from "react-apexcharts";

class TreemapSongs extends Component {
  constructor(props) {
    super(props);
    const artistNameData = this.props.data.map((item) => item["Song Name"])
    const position = this.props.data.map((item) => item["Total Streams"])
    console.log(artistNameData);
    // console.log(fileData);
    const mapper = artistNameData.map((artist, index) => {
        return {
            x: artist + "",
            y: position[index]
        }
    });

    this.state = {
      series: [
        {
          data: mapper
        }
      ],
      options: {
        legend: {
          show: false
        },
        chart: {
          height: 500,
          type: "treemap"
        },
        title: {
          text: "VIZIFY - Total streams",
          align: "center"
        },
        colors: [
          "#b30000",
          "#7c1158",
          "#4421af",
          "#1a53ff",
          "#0d88e6",
          "#00b7c7",
          "#5ad45a",
          "#8be04e",
          "#ebdc78",
          "#7F94B0",
          "#2e2b28",
          "#0040ff"
        ], 
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        }
      },
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="treemap"
              width="2600px"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TreemapSongs;
