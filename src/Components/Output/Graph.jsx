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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ solvedProcessesInfo }) => {
  // Extract data for the chart
  const labels = solvedProcessesInfo.map((process) => process.job); // Process names (e.g., A, B, C)
  const burstTimes = solvedProcessesInfo.map((process) => process.bt); // Burst Times
  const turnaroundTimes = solvedProcessesInfo.map((process) => process.tat); // Turnaround Times
  const waitingTimes = solvedProcessesInfo.map((process) => process.wat); // Waiting Times

  // Chart data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Burst Time",
        data: burstTimes,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Turnaround Time",
        data: turnaroundTimes,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Waiting Time",
        data: waitingTimes,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Process Metrics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Time Units",
        },
      },
      x: {
        title: {
          display: true,
          text: "Processes",
        },
      },
    },
  };

  return (
    <div className="mt-8 bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl shadow-black border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Graphical Representation
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
