import React from "react";
import Chart from "react-apexcharts";

const S4060 = ({ report }) => {
  const getKeys = report && Object.keys(report.salary_range_40_60);
  const getValues = report && Object.values(report.salary_range_40_60);
  const state = {
    options: {
      title: {
        text: "40k to 60k Monthly Salary",
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
      // colors: ["#8E30FF", "#CBB6F8", "#6200EE", "#5E3FBE"],
      dataLabels: {
        enabled: true,
      },

      labels: getKeys,
    },

    series: getValues,
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
};

export default S4060;
