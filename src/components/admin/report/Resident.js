import React from "react";
import Chart from "react-apexcharts";

const Resident = ({
  getResidentAllMonth,
  getResidentcount,
  getResidentsum,
}) => {
  const state = {
    options: {
      title: {
        text: "Resident",
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
      labels: getResidentAllMonth,

      yaxis: [
        {
          title: {
            text: "Total MA",
          },
        },
        {
          opposite: true,
          title: {
            text: "# of Resident",
          },
        },
      ],
    },

    series: [
      {
        name: "Total MA",
        type: "column",
        data: getResidentsum,
      },
      {
        name: "# of Resident",
        type: "column",
        data: getResidentcount,
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

export default Resident;
