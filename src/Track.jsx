import React from "react";
import { Path } from "react-native-svg";

function Track({ height, thickness, radius, thumbRadius }) {
  const insideRadius = radius - thickness;
  return (
    <Path
      d={`
      M ${thumbRadius / 2} ${height - thickness}
      a ${radius} ${radius} 0 1 1 ${radius * 2} 0
      a ${thickness / 2} ${thickness / 2} 0 1 1 -${thickness} 0
      a ${insideRadius} ${insideRadius} 0 0 0 -${insideRadius * 2} 0
      a ${thickness / 2} ${thickness / 2} 0 1 1 -${thickness} 0
      Z
    `}
      fill="#dddddd"
    />
  );
}

export default Track;
