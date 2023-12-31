import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ProgressChart = ({ progress }) => {
  const data = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ['#36A2EB', 'lightgray'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutoutPercentage: 75, // Adjust this to control the size of the center hole
    rotation: 1 * Math.PI, // Start the chart from the top
    circumference: 1 * Math.PI, // Set the total circumference to create a circle
    legend: {
      display: false,
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default ProgressChart;
