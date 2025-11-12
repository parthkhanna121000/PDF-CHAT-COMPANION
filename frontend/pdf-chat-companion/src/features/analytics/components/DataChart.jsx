import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// This is a required step: register the components you want to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart options (you can customize this)
export const options = {
  responsive: true,
  maintainAspectRatio: false, // Allows chart to fill the container height
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false, // We already have a title in the parent component
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

/**
 * Props:
 * - data: The chart data object (labels, datasets, etc.)
 */
function DataChart({ data }) {
  if (!data) {
    return <div>Loading chart data...</div>;
  }

  return <Bar options={options} data={data} />;
}

export default DataChart;
