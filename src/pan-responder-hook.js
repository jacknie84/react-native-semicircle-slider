import { useMemo, useCallback } from "react";
import { PanResponder } from "react-native";
import { range } from "lodash";
import { calculateAngleLength } from "./calculate-service";

function useTicks(min, max) {
  return useMemo(
    () =>
      range(min, max + 1).map((value) => ({
        value,
        angleLength: calculateAngleLength(value, min, max),
      })),
    [min, max],
  );
}

function usePanResponderMove(value, min, max, isDisabled, onChange, center) {
  const ticks = useTicks(min, max);
  const gap = useMemo(() => (ticks[ticks.length - 1].angleLength - ticks[0].angleLength) / ticks.length, [ticks]);
  return useCallback(
    (move) => {
      if (isDisabled) {
        return value;
      }
      const first = ticks[0];
      const last = ticks[ticks.length - 1];
      const atan2 = Math.atan2(move.y - center.y, move.x - center.x);
      const newAngle = atan2 + Math.PI;
      const angleLength = newAngle % Math.PI;
      const isFirst = first.angleLength > angleLength - gap * 0.5;
      const isLast = last.angleLength < angleLength + gap * 0.5;
      if (atan2 < 0) {
        if (isFirst) {
          onChange(first?.value || value);
        } else if (isLast) {
          onChange(last?.value || value);
        } else {
          const found = ticks.find((tick) => Math.abs(tick.angleLength - angleLength) < gap);
          onChange(found?.value || value);
        }
      }
    },
    [ticks, gap, onChange],
  );
}

function usePanResponder({ value, min, max, isDisabled, center, resetCenter, onChange, onSlidingComplete }) {
  const onPanResponderMove = usePanResponderMove(value, min, max, isDisabled, onChange, center);
  return useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: resetCenter,
        onPanResponderEnd: () => onSlidingComplete(),
        onPanResponderMove: (_, { moveX, moveY }) => onPanResponderMove({ x: moveX, y: moveY }),
        onPanResponderRelease: () => onSlidingComplete(),
      }),
    [resetCenter, onPanResponderMove],
  );
}

export default usePanResponder;
