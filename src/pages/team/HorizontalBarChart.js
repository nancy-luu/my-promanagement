import React from 'react';
import './HorizontalBarChart.css'; 

const HorizontalBarChart = ({ data }) => {
  return (
    <div className="horizontal-bar-chart">
      {data.map((segment, index) => (
        <div
          key={index}
          className="bar-segment"
          style={{
            width: `${segment.percentage}%`,
            backgroundColor: segment.color,
          }}
        >
          <span className="segment-label">{segment.label}</span>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBarChart;