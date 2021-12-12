import React from "react";
import Chart from "react-apexcharts";

const SalaryRange = ({ report }) => {
  console.log(report);
  const state = {
    options: {
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
      colors: ["#8E30FF", "#CBB6F8", "#6200EE", "#5E3FBE"],
      dataLabels: {
        enabled: true,
      },

      labels: ["Todo", "Progress"],
    },

    series: [44, 55],
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
};

export default SalaryRange;
