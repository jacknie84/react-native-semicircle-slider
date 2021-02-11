import React, { useMemo } from "react";
import { Path } from "react-native-svg";
import { calculateArcCircle } from "./calculate-service";
import { DISABLE_COLOR } from "./Constants";

function LinearGradientPathSegment({ index, segments, radius, angleLength, thickness, isDisabled, id }) {
  if (angleLength <= 0) {
    return null;
  }

  const { fromX, fromY, toX, toY } = useMemo(() => calculateArcCircle(index, segments, radius, 0, angleLength), [
    index,
    segments,
    radius,
    angleLength,
  ]);

  return (
    <Path
      d={`M ${fromX} ${fromY} A ${radius} ${radius} 0 0 1 ${toX} ${toY}`}
      strokeWidth={thickness}
      stroke={isDisabled ? DISABLE_COLOR : `url(#${id})`}
      fill="transparent"
    />
  );
}

export default LinearGradientPathSegment;
