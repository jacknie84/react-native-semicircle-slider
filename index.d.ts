import { GestureResponderHandlers } from "react-native";
import { NativeMethods, PanResponderInstance } from "react-native";

export type Point = { x: number; y: number };
export type CenterHook = (width: number, methods?: NativeMethods) => { center: Point; resetCenter: () => void };
export type PanResponderHookOptions = {
  value: number;
  min: number;
  max: number;
  isDisabled: boolean;
  onChange: (value: number) => void;
  onSlidingComplete: () => void;
};
export type PanResponderHook = (options: PanResponderHookOptions & ReturnType<CenterHook>) => PanResponderInstance;

export type SliderThumbProps = {
  x: number;
  y: number;
  radius: number;
  panHandlers: GestureResponderHandlers;
  isDisabled: boolean;
};
export const SliderThumb: React.FunctionComponent<SliderThumbProps>;
export type SliderThumb = React.FunctionComponent<SliderThumbProps>;

export type LinearGradientDefProps = {
  index: number;
  segments: number;
  radius: number;
  angleLength: number;
  id: string;
};
export const LinearGradientDef: React.FunctionComponent<LinearGradientDefProps>;
export type LinearGradientDef = React.FunctionComponent<LinearGradientDefProps>;

export type LinearGradientPathSegmentProps = {
  index: number;
  segments: number;
  radius: number;
  angleLength: number;
  thickness: number;
  isDisabled: boolean;
  id: string;
};
export const LinearGradientPathSegment: React.FunctionComponent<LinearGradientPathSegmentProps>;
export type LinearGradientPathSegment = React.FunctionComponent<LinearGradientPathSegmentProps>;

export type TrackProps = { height: number; thickness: number; radius: number; thumbRadius: number };
export const Track: React.FunctionComponent<TrackProps>;
export type Track = React.FunctionComponent<TrackProps>;

export type SemicircleSliderProps = PanResponderHookOptions & { width: number; height: number; thickness: number };
export const SemicircleSlider: React.FunctionComponent<SemicircleSliderProps>;
export type SemicircleSlider = React.FunctionComponent<SemicircleSliderProps>;

export default SemicircleSlider;
