import React, { useEffect, useRef, useMemo } from "react";
import drawChart from "./drawChart";

const DonutChart = ({ data }) => {
  const ref = useRef(null);

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (ref.current) {
      drawChart(ref.current, memoizedData);
    }
  }, [memoizedData]);

  return (
    <div className="container">
      <div className="graph" ref={ref} />
    </div>
  );
};

export default DonutChart;
