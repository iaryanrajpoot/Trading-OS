import { useState, useCallback } from "react";

/**
 * Tracks normalized mouse position (-0.5 to 0.5) relative to a ref'd element.
 * Used to drive parallax effects.
 *
 * Usage:
 *   const ref = useRef(null);
 *   const [parallax, handleMove] = useMousePosition(ref);
 *   <section ref={ref} onMouseMove={handleMove}>...</section>
 */
export const useMousePosition = (ref) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPos({ x, y });
    },
    [ref]
  );

  return [pos, handleMove];
};
