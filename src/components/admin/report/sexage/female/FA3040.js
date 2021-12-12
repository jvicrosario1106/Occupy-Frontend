import React from "react";
import Chart from "react-apexcharts";

const FA3040 = ({ report }) => {
  const getKeys = report && Object.keys(report.female_30_40);
  const getValues = report && Object.values(report.female_30_40);
  const state = {
    options: {
      title: {
        text: "Female (30-40 Years Old and above)",
      },
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false,
          tools: {
            download: false,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
          },
        },
      },
      // colors: ["#5E3FBE", "#CBB6F8", "#6200EE"],
      labels: getKeys,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },

    series: getValues,
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="pie" />
    </div>
  );
};

export default FA3040;
