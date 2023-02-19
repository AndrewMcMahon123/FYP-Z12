import React from "react";
import { Line } from "react-chartjs-2";
function BenchmarkChart({ chartData }) {
  return (
      <Line
        data={chartData}
        options={{
        animation: false,
          plugins: {
            title: {
            responsive: true,
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
export default BenchmarkChart;