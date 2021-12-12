import React from "react";
import Chart from "react-apexcharts";

const AccountingResidentChart = ({ residentComplete, residentGoing }) => {
  const state = {
    options: {
      title: {
        text: "Resident Payment Status",
        style: {
          opacity: 0.6,
        },
      },
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
      colors: ["rgba(142, 48, 255, 0.6)"],
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "year",
        categories: ["Complete", "On-Going"],
      },
    },

    series: [
      {
        name: "series-1",
        data: [residentComplete, residentGoing],
      },
    ],
  };
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};

export default AccountingResidentChart;
