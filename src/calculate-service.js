export function calculateAngleLength(value, minValue, maxValue) {
  if (value >= maxValue) {
    return Math.PI;
  }
  if (value <= minValue) {
    return 0;
  }
  return ((value - minValue) / (maxValue - minValue)) * Math.PI;
}

export function calculateArcCircle(index, segments, radius, startAngle0 = 0, angleLength0 = Math.PI) {
  // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
  const startAngle = startAngle0 % (2 * Math.PI);
  const angleLength = angleLength0 % (2 * Math.PI);
  const fromAngle = (angleLength / segments) * index + startAngle;
  const toAngle = (angleLength / segments) * (index + 1) + startAngle;
  const fromX = radius * Math.cos(fromAngle) * -1;
  const fromY = radius * Math.sin(fromAngle) * -1;
  const realToX = radius * Math.cos(toAngle) * -1;
  const realToY = radius * Math.sin(toAngle) * -1;

  // add 0.005 to start drawing a little bit earlier so segments stick together
  const toX = radius * Math.cos(toAngle + 0.005) * -1;
  const toY = radius * Math.sin(toAngle + 0.005) * -1;

  return {
    fromX,
    fromY,
    toX,
    toY,
    realToX,
    realToY,
  };
}
