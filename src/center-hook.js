import { useCallback, useState } from "react";

const initialValue = { x: 0, y: 0 };

function useCenter(width, methods) {
  const [center, setCenter] = useState(initialValue);
  const resetCenter = useCallback(
    () =>
      methods?.measure((x, y, w, h, pageX, pageY) => {
        const halfWidth = width / 2;
        setCenter({ x: pageX + halfWidth, y: pageY + halfWidth });
      }),
    [width, methods],
  );

  return { center, resetCenter };
}

export default useCenter;
