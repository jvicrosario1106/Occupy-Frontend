import React from "react";
import Chart from "react-apexcharts";

const Payment = ({ getCount, getMonth }) => {
  const state = {
    options: {
      title: {
        text: "Inquiries",
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
        enabled: false,
      },
      xaxis: {
        type: "year",
        categories: getMonth,
      },
    },

    series: [
      {
        name: "Inquiry",
        data: getCount,
      },
    ],
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="area" />
    </div>
  );
};

export default Payment;
