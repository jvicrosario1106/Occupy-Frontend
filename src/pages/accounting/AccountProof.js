import React from "react";
import Chart from "react-apexcharts";

const AccountingProof = ({ verified, unverified }) => {
  const state = {
    options: {
      title: {
        text: "Proof of Payment Status",
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
        categories: ["Verified", "Unverified"],
      },
    },

    series: [
      {
        name: "series-1",
        data: [verified, unverified],
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

export default AccountingProof;
