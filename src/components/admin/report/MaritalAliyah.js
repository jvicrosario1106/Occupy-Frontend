import React from "react";
import Chart from "react-apexcharts";

const MaritalAliyah = ({ report }) => {
  const getKeys =
    report.count_aliyah.length > 0 &&
    report.count_aliyah.map((key) => {
      return key.marital;
    });

  const getValues =
    report.count_aliyah.length > 0 &&
    report.count_aliyah.map((key) => {
      return key.count;
    });
  const state = {
    options: {
      title: {
        text: "Aliyah Project",
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
      xaxis: {
        type: "year",
        categories: getKeys,
      },
    },

    series: [
      {
        data: getValues,
      },
    ],
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="bar" />
    </div>
  );
};

export default MaritalAliyah;
