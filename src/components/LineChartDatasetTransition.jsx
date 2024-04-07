//linechartdatasettransition

import { useState } from "react";
import { data } from "../utils/data";
import  LineChart  from "../components/LineChart";

const BUTTONS_HEIGHT = -90;

const buttonStyle = {
  border: "1px solid #9a6fb0",
  borderRadius: "3px",
  padding: "4px 8px",
  margin: "10px 2px",
  fontSize: 14,
  color: "#560f79",
  opacity: 0.7,
  cursor : "pointer"
};

const LineChartDatasetTransition = ({
  width,
  height,
}) => {
  const [selectedGroup, setSelectedGroup] = useState("conversionRate2022");

  return (
    <div>
      <div style={{ height: BUTTONS_HEIGHT }}>
        <button className="LineChartButton" style={buttonStyle} onClick={() => setSelectedGroup("conversionRate2022")}>
        Conversion Rate 2022
        </button>
        <button style={buttonStyle} onClick={() => setSelectedGroup("conversionRate2023")}>
        Conversion Rate 2023
        </button>
      </div>
      <LineChart
        width={width}
        height={height - BUTTONS_HEIGHT}
        data={data}
        selectedGroup={selectedGroup}
      />
    </div>
  );
};

export default LineChartDatasetTransition;
