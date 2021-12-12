import React from "react";
import Chart from "react-apexcharts";

const Reserved = ({
  getReservedAllMonth,
  getReservedcount,
  getReservedsum,
}) => {
  const state = {
    options: {
      title: {
        text: "Reserved",
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
      // stroke: {
      //   width: [0, ],
      // },
      // colors: ["#8E30FF", "#CBB6F8"],
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],
      },
      labels: getReservedAllMonth,

      yaxis: [
        {
          title: {
            text: "Total MA",
          },
        },
        {
          opposite: true,
          title: {
            text: "# Of Reserved",
          },
        },
      ],
    },

    series: [
      {
        name: "Total MA",
        type: "column",
        data: getReservedsum,
      },
      {
        name: "# Of Reserved",
        type: "column",
        data: getReservedcount,
      },
    ],
  };
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width={420}
      />
    </div>
  );
};

export default Reserved;
