import React from "react";
import Chart from "react-apexcharts";

const S6080 = ({ report }) => {
  const getKeys = report && Object.keys(report.salary_range_60_80);
  const getValues = report && Object.values(report.salary_range_60_80);
  const state = {
    options: {
      title: {
        text: "60k to 80k Monthly Salary",
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

export default S6080;
