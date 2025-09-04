import React, { useState, useRef, useCallback } from "react";

export default function GridLayout() {
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const timeoutRefs = useRef(new Map());

  const cols = 30; // more dots for finer pattern
  const rows = 20; // more dots for finer pattern
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
    }, 300);
    timeoutRefs.current.set(itemIndex, timeoutId);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-40 md:opacity-50 bg-black overflow-hidden">
      <div className="w-full h-full relative">
        <div
          className="grid w-full h-full gap-0 p-4"
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
                className="flex items-center justify-center transition-all duration-300 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
              >
                <div
                  className="rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: isHovered ? '8px' : '2px',
                    height: isHovered ? '8px' : '2px',
                    backgroundColor: isHovered 
                      ? 'rgba(156, 163, 175, 0.9)' 
                      : 'rgba(107, 114, 128, 0.6)',
                    boxShadow: isHovered
                      ? '0 0 12px rgba(156, 163, 175, 0.8), 0 0 24px rgba(156, 163, 175, 0.4)'
                      : 'none',
                    transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}