import React, { useMemo } from "react";
import { G, Circle, Path } from "react-native-svg";
import { DISABLE_COLOR } from "./Constants";

const color = "#3d9aab";
const strokeWidth = 1;

function SliderThumb({ x, y, radius, panHandlers, isDisabled }) {
  const realRadius = useMemo(() => radius - strokeWidth, [radius]);
  const innerRadius = useMemo(() => realRadius - 4, [radius]);
  return (
    <G fill="#fff" transform={{ translate: `${x}, ${y}` }} {...panHandlers}>
      <Circle r={innerRadius * 2} fill="transparent" />
      <Path
        d={`
            M -${realRadius} 0
            a ${realRadius} ${realRadius} 0 0 1 ${realRadius * 2} 0
            a ${realRadius} ${realRadius} 0 0 1 -${realRadius * 2} 0
            Z
          `}
        strokeWidth={strokeWidth}
        stroke="#eee"
      />
      <Circle r={innerRadius} fill={isDisabled ? DISABLE_COLOR : color} />
    </G>
  );
}

export default SliderThumb;
