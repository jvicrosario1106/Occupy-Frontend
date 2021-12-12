import React from "react";
import Chart from "react-apexcharts";

const EmpStats = () => {
  const state = {
    options: {
      // title: {
      //   text: "Male (60 Years Old and above)",
      // },
      legend: {
        show: true,
        position: "bottom",
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

      labels: [
        "Employed Private",
        "OFW",
        "Retired",
        "Employed Government",
        "Immigrant",
        "Self-Employed Professional",
        "Self-Employed with Business",
      ],
    },

    series: [3, 6, 1, 2, 3, 1],
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="pie" />
    </div>
  );
};

export default EmpStats;
