import React, { useMemo, useRef } from "react";
import Svg, { Defs, G, Path } from "react-native-svg";
import useCenter from "./center-hook";
import usePanResponder from "./pan-responder-hook";
import { calculateAngleLength, calculateArcCircle } from "./calculate-service";
import { range } from "lodash";
import LinearGradientDef from "./LinearGradientDef";
import LinearGradientPathSegment from "./LinearGradientPathSegment";
import SliderThumb from "./SliderThumb";
import Track from "./Track";
import { DISABLE_COLOR, SLIDER_THUMB_RADIUS, TRACK_GRADIENT_SEGMENTS } from "./Constants";

const generateId = (index) => `gradient${index}`;

function SemicircleSlider(props) {
  const { value, min, max, width, height, thickness, isDisabled } = props;
  const svgRef = useRef(null);
  const centerHook = useCenter(width, svgRef.current);
  const radius = useMemo(() => width / 2 - SLIDER_THUMB_RADIUS / 2, [width]);
  const angleLength = useMemo(() => calculateAngleLength(value, min, max), [value, min, max]);
  const panResponder = usePanResponder({ ...props, ...centerHook });
  const { toX, toY } = useMemo(
    () => calculateArcCircle(TRACK_GRADIENT_SEGMENTS - 1, TRACK_GRADIENT_SEGMENTS, radius, 0, angleLength),
    [radius, angleLength]
  );

  return (
    <Svg ref={svgRef} onLayout={() => centerHook.resetCenter()} width={width} height={height}>
      <Defs>
        {range(0, TRACK_GRADIENT_SEGMENTS).map((index) => (
          <LinearGradientDef
            key={index}
            index={index}
            id={generateId(index)}
            segments={TRACK_GRADIENT_SEGMENTS}
            radius={radius}
            angleLength={angleLength}
          />
        ))}
      </Defs>
      <Track height={height} thickness={thickness} radius={radius} thumbRadius={SLIDER_THUMB_RADIUS} />
      <G transform={{ translate: `${width / 2}, ${height - thickness}` }}>
        {value > min && (
          <Path
            d={`M -${radius} 0 a ${thickness / 2} ${thickness / 2} 0 0 0 ${thickness} 0 Z`}
            fill={isDisabled ? DISABLE_COLOR : `url(#${generateId(0)})`}
          />
        )}
        {range(0, TRACK_GRADIENT_SEGMENTS).map((index) => (
          <LinearGradientPathSegment
            key={index}
            index={index}
            id={generateId(index)}
            segments={TRACK_GRADIENT_SEGMENTS}
            radius={radius}
            angleLength={angleLength}
            thickness={thickness}
            isDisabled={isDisabled}
          />
        ))}
        <SliderThumb
          radius={SLIDER_THUMB_RADIUS}
          x={toX}
          y={toY}
          panHandlers={panResponder.panHandlers}
          isDisabled={isDisabled}
        />
      </G>
    </Svg>
  );
}

export default SemicircleSlider;
