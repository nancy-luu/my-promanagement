import * as d3 from "d3";

const drawChart = (element, data) => {
  const colors = ["#FFEE53", "#FF6525", "#7521FF"]; 
  const boxSize = 500;

  d3.select(element).selectAll("*").remove(); // Remove the old svg


  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "180")
    .attr("width", "180")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

    // creating pie chart with radius 250
    // padAngle = space between sections
    const arcGenerator = d3.arc().padAngle(0.02).innerRadius(125).outerRadius(250);

    // logic to define which field name will be used to render the chart data
    const pieGenerator = d3.pie().value((d) => d.value);

    // rendering pie chart using D3 api
    const arcs = svg.selectAll().data(pieGenerator(data)).enter();
    arcs
        .append("path")
        .attr("d", arcGenerator)
        .style("stroke", "rgba(79, 79, 79, 0.444)")
        .style("stroke-width", 5)
        .style("fill", (d, i) => colors[i % data.length])
        .transition()
        .duration(700)
        .attrTween("d", function (d) {
          const i = d3.interpolate(d.startAngle, d.endAngle);
          return function (t) {
            d.endAngle = i(t);
            return arcGenerator(d);
          };
        });
};

export default drawChart;
