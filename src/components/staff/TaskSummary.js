import React from "react";
import Chart from "react-apexcharts";

const TaskSummary = (dashboard) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const getTask =
    dashboard.dashboard.tasks &&
    dashboard.dashboard.tasks.filter(
      (t) => t.department_task.id === user.department
    );

  const countTodo = getTask && getTask.filter((t) => t.station === "TODO");
  const countProgress =
    getTask && getTask.filter((t) => t.station === "PROGRESS");
  const countReview = getTask && getTask.filter((t) => t.station === "REVIEW");
  const countDone = getTask && getTask.filter((t) => t.station === "DONE");

  const state = {
    options: {
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
      colors: ["#8E30FF", "#CBB6F8", "#6200EE", "#5E3FBE"],
      labels: ["Todo", "Progress", "Review", "Done"],
    },

    series: [
      countTodo.length,
      countProgress.length,
      countReview.length,
      countDone.length,
    ],
  };
  return (
    <div>
      <Chart options={state.options} series={state.series} type="donut" />
    </div>
  );
};

export default TaskSummary;
