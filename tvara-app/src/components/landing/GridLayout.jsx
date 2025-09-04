import React, { useState, useRef, useCallback } from "react";

export default function GridLayout() {
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const timeoutRefs = useRef(new Map());

  const cols = 20; // fixed number of columns
  const rows = 12; // fixed number of rows
  const totalItems = cols * rows;
  const gridItems = Array.from({ length: totalItems }, (_, i) => i);

  const handleMouseEnter = useCallback((itemIndex) => {
    if (timeoutRefs.current.has(itemIndex)) {
      clearTimeout(timeoutRefs.current.get(itemIndex));
      timeoutRefs.current.delete(itemIndex);
    }
    setHoveredItems((prev) => new Set(prev).add(itemIndex));
  }, []);

  const handleMouseLeave = useCallback((itemIndex) => {
    const timeoutId = setTimeout(() => {
      setHoveredItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemIndex);
        return newSet;
      });
      timeoutRefs.current.delete(itemIndex);
    }, 200);
    timeoutRefs.current.set(itemIndex, timeoutId);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-40 md:opacity-25 bg-white overflow-hidden">
      <div className="w-full h-full bg-black relative">
        <div
          className="grid w-full h-full gap-0"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {gridItems.map((item) => {
            const isHovered = hoveredItems.has(item);
            return (
              <div
                key={item}
                className="border border-gray-600 bg-black transition-all duration-300 relative overflow-hidden"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
                style={{
                  boxShadow: isHovered
                    ? `inset 4px 4px 8px rgba(107,114,128,0.6), inset -2px -2px 8px rgba(107,114,128,0.2)`
                    : "none",
                  borderColor: isHovered
                    ? "rgba(107,114,128,0.9)"
                    : "rgb(75,85,99)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
