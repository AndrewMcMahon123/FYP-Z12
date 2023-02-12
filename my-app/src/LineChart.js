import React from "react";
import { Line } from "react-chartjs-2";
function LineChart2({ chartData }) {
  return (
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Benchmarks",
              borderColor: "red",
              backgroundColor: "red",
              fill: true
            },
            legend: {
              display: false
            }
          }
        }}
      />
  );
}
export default LineChart2;