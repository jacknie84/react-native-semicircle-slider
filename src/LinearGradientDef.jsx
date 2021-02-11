import React from "react";
import { interpolateHcl } from "d3-interpolate";
import { calculateArcCircle } from "./calculate-service";
import { LinearGradient, Stop } from "react-native-svg";

const interpolate = interpolateHcl("#bcdce2", "#3d9aab");

function LinearGradientDef({ index, segments, radius, angleLength, id }) {
  const { fromX, fromY, toX, toY } = calculateArcCircle(index, segments, radius, 0, angleLength);
  const fromColor = interpolate(index / segments);
  const toColor = interpolate((index + 1) / segments);

  return (
    <LinearGradient id={id} x1={fromX} y1={fromY} x2={toX} y2={toY}>
      <Stop offset="0%" stopColor={fromColor} />
      <Stop offset="1" stopColor={toColor} />
    </LinearGradient>
  );
}

export default LinearGradientDef;
