import React from "react";
import Chart from "react-apexcharts";

const AverageSalary = () => {
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
        enabled: false,
      },
      xaxis: {
        type: "year",
        categories: ["Natania", "Elyana", "Aliyah"],
      },
    },

    series: [
      {
        name: "Natania",
        data: [44.23],
      },
      {
        name: "Elyana",
        data: [76],
      },
      {
        name: "Aliyah",
        data: [35],
      },
    ],
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="bar" />
    </div>
  );
};

export default AverageSalary;
