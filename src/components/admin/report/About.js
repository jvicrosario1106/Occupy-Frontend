import React from "react";
import Chart from "react-apexcharts";

const About = ({ report }) => {
  const getKeys = report && report.count_about.map((keys) => keys.about);
  const getValues = report && report.count_about.map((keys) => keys.count);

  const state = {
    options: {
      title: {
        text: "Hear About the company",
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

      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },

      // colors: ["#8E30FF", "#CBB6F8", "#6200EE", "#5E3FBE"],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: getKeys,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },

    series: [
      {
        name: "Type",
        data: getValues,
      },
    ],
  };
  return (
    <div>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height="215%"
      />
    </div>
  );
};

export default About;
