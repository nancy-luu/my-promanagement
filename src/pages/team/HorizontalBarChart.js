import React from 'react';
import './HorizontalBarChart.css'; 

const HorizontalBarChart = ({ data }) => {

    const existingData = data.filter(segment => segment.percentage > 0);


  return (
    <div className="horizontal-bar-chart">
      {existingData.map((segment, index) => (
        <div
          key={index}
          className="bar-segment"
          style={{
            width: `${segment.percentage}%`,
            backgroundColor: segment.color,
          }}
        ></div>
      ))}
    </div>
  );
};

export default HorizontalBarChart;