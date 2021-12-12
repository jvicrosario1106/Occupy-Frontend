import React from "react";
import Chart from "react-apexcharts";

const DepartmentSummary = ({ yearSales, getYearSales }) => {
  const state = {
    options: {
      title: {
        text: "Yearly Sales",
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

      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "year",
        categories: yearSales,
      },
    },

    series: [
      {
        name: "Yearly Sales",
        data: getYearSales,
      },
    ],
  };
  return (
    <div style={{ marginTop: 25 }}>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width={420}
      />
    </div>
  );
};

export default DepartmentSummary;
