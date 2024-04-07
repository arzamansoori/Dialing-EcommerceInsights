import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { useSpring, animated } from "@react-spring/web";
import useChartDimensions from "../hooks/useChartDimensions";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const LineChart = ({ height, data, selectedGroup }) => {
  const [ref, dms] = useChartDimensions({
    marginTop: MARGIN.top,
    marginBottom: MARGIN.bottom,
    marginLeft: MARGIN.left,
    marginRight: MARGIN.right,
  });

  const boundsWidth = dms.width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const axesRef = useRef(null);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, d3.max(data, d => d[selectedGroup])]).range([boundsHeight, 0]);
  }, [data, selectedGroup, boundsHeight]);

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  }, [dms.width, boundsWidth]);

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const lineBuilder = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d[selectedGroup]));
  const linePath = lineBuilder(data);

  if (!linePath) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        height,
      }}
      className="container"
    >
      <svg width={dms.width} height={height}>
        {/* first group is lines */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <LineItem
            path={linePath}
            color={selectedGroup === "conversionRate2023" ? "#69b3a2" : "#9a6fb0"}
          />
        </g>
        {/* Second is for the axes */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};

const LineItem = ({ path, color }) => {
  const springProps = useSpring({
    to: {
      path,
      color,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.path
      d={springProps.path}
      fill={"none"}
      stroke={color}
      strokeWidth={2}
    />
  );
};

export default LineChart;
