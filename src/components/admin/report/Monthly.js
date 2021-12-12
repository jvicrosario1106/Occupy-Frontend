import React from "react";
import Chart from "react-apexcharts";

const DepartmentSummary = ({
  yearMonthSumActual,
  yearMonthSumPredicted,
  getMonthSales,
}) => {
  const state = {
    options: {
      title: {
        text: "Monthly Sales Forecast",
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
      labels: getMonthSales,

      yaxis: [
        {
          title: {
            text: "Actual",
          },
        },
        {
          opposite: true,
          title: {
            text: "Predicted",
          },
        },
      ],
    },

    series: [
      {
        name: "Actual",
        type: "column",
        data: yearMonthSumActual,
      },
      {
        name: "Predicted",
        type: "line",
        data: yearMonthSumPredicted,
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

export default DepartmentSummary;
