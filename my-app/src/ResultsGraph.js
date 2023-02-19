import React from "react";
import { Line } from "react-chartjs-2";
import { Data, Data2 } from "./Data";
import { useState } from "react";
import moment from "moment";

const formatSecondsToMinutesAndSeconds = (seconds) => {
  return moment.duration(seconds, "seconds").format("mm:ss");
};

const ResultsChart = () => {
  const [resultsData, setResultsData] = useState({
    labels: Data2.map((data) => data.distance),
    datasets: [
      {
        label: "Results",
        data: Data2.map((data) => formatSecondsToMinutesAndSeconds(data.split)),
        backgroundColor: 'blue',
        borderColor: "blue",
        borderWidth: 1,
        type: 'line'
      }
    ]
  });

  const chartConfig = {
    type: 'line',
    data: resultsData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
            min: 1,
            max: 2,
            stepSize: 0.2
          }
        }]
      }
    }
  };

  return (
    <div>
      <Line data={resultsData} options={chartConfig.options} />
    </div>
  );
};

export default ResultsChart;
