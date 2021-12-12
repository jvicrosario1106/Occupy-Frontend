import React from "react";
import Chart from "react-apexcharts";

const DepartmentSummary = ({ getCount, getMonth }) => {
  const state = {
    options: {
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
          },
        },
      },
      colors: ["#8E30FF"],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "year",
        categories: getMonth,
      },
    },

    series: [
      {
        name: "series-1",
        data: getCount,
      },
    ],
  };
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height="125%"
      />
    </div>
  );
};

export default DepartmentSummary;
