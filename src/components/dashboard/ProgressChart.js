// ProgressChart.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressChart = ({ progress }) => {
  return (
    <CircularProgressbar
      value={progress * 100}
      text={`${progress.toFixed(2)}`}
      styles={buildStyles({
        textColor: '#000', // Change text color
        pathColor: 'var(--color_2)',
        trailColor: 'lightgray',
      })}
    />
  );
};

export default ProgressChart;
