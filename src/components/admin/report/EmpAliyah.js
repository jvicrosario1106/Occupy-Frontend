import React from "react";
import Chart from "react-apexcharts";

const EmpAliyah = ({ report }) => {
  const getKeys =
    report.count_aliyah_emp.length > 0 &&
    report.count_aliyah_emp.map((key) => {
      return key.marital;
    });

  const getValues =
    report.count_aliyah_emp.length > 0 &&
    report.count_aliyah_emp.map((key) => {
      return key.count;
    });
  const state = {
    options: {
      title: {
        text: "Aliyah Project",
      },
      legend: {
        show: false,
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

export default EmpAliyah;
