import React from "react";
import Chart from "react-apexcharts";

const A60 = ({ report }) => {
  const getKeys = report && Object.keys(report.male_60_above);
  const getValues = report && Object.values(report.male_60_above);
  const state = {
    options: {
      title: {
        text: "Male (60 Years Old and above)",
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

export default A60;
