import React, { useState, useRef, useCallback } from 'react';

export default function GridLayout() {
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timeoutRefs = useRef(new Map());

  // Calculate different grid sizes for different screens
  const getGridConfig = () => {
    return {
      sm: { cols: 8, rows: 12, total: 96 },   // Small screens: 8x12
      md: { cols: 12, rows: 12, total: 144 }, // Medium screens: 12x12  
      lg: { cols: 16, rows: 12, total: 192 }, // Large screens: 16x12
      xl: { cols: 20, rows: 12, total: 240 }, // Extra large: 20x12
      '2xl': { cols: 24, rows: 12, total: 288 } // 2xl screens: 24x12
    };
  };

  // Use the largest grid size for total items
  const maxItems = 288;
  const gridItems = Array.from({ length: maxItems }, (_, i) => i);

  const getCurrentCols = () => {
    return window.innerWidth >= 1536 ? 24 : 
           window.innerWidth >= 1280 ? 20 :
           window.innerWidth >= 1024 ? 16 :
           window.innerWidth >= 768 ? 12 : 8;
  };

  const getAdjacentItems = (itemIndex) => {
    const cols = getCurrentCols();
    const row = Math.floor(itemIndex / cols);
    const col = itemIndex % cols;
    
    const adjacent = [];
    return adjacent.filter(idx => idx >= 0 && idx < maxItems);
  };

  const handleMouseEnter = useCallback((itemIndex) => {
    if (timeoutRefs.current.has(itemIndex)) {
      clearTimeout(timeoutRefs.current.get(itemIndex));
      timeoutRefs.current.delete(itemIndex);
    }
    
    // Add current item and adjacent items immediately
    setHoveredItems(prev => {
      const newSet = new Set(prev);
      newSet.add(itemIndex);
      
      // Add adjacent items for border-following effect
      const adjacent = getAdjacentItems(itemIndex);
      adjacent.forEach(adjItem => {
        newSet.add(adjItem);
      });
      
      return newSet;
    });
  }, []);

  const handleMouseLeave = useCallback((itemIndex) => {
    // Set timeout to remove this item and its adjacent items after delay
    const timeoutId = setTimeout(() => {
      setHoveredItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemIndex);
        
        // Also remove adjacent items (but only if they don't have their own active timeout)
        const adjacent = getAdjacentItems(itemIndex);
        adjacent.forEach(adjItem => {
          if (!timeoutRefs.current.has(adjItem)) {
            newSet.delete(adjItem);
          }
        });
        
        return newSet;
      });
      timeoutRefs.current.delete(itemIndex);
    }, 200); // 500ms delay before removing
    
    timeoutRefs.current.set(itemIndex, timeoutId);
  }, []);

  const getHoverIntensity = (itemIndex) => {
    if (!hoveredItems.has(itemIndex)) return 0;
    
    // You can add more sophisticated intensity calculation here
    // For now, all hovered items have the same intensity
    return 1;
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 opacity-40 md:opacity-25 bg-white overflow-hidden">
      <div className="w-full h-full bg-black relative">        
        {/* Grid with responsive columns and aspect-square cells */}
        <div className="grid w-full h-full gap-0 relative
          grid-cols-9 grid-rows-10
          sm:grid-cols-8 sm:grid-rows-10
          md:grid-cols-12 md:grid-rows-12  
          lg:grid-cols-16 lg:grid-rows-12
          xl:grid-cols-20 xl:grid-rows-12
          2xl:grid-cols-24 2xl:grid-rows-12">
          {gridItems.map((item) => {
            const isHovered = hoveredItems.has(item);
            const intensity = getHoverIntensity(item);
            
            return (
              <div
                key={item}
                className="border border-gray-600 bg-black transition-all duration-300 aspect-square relative overflow-hidden"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={() => handleMouseLeave(item)}
                style={{
                  filter: 'blur(0.5px)',
                  boxShadow: isHovered ? 
                    `inset ${4 + intensity * 4}px ${4 + intensity * 4}px ${8 + intensity * 8}px rgba(107, 114, 128, ${0.4 + intensity * 0.4}), inset -2px -2px 8px rgba(107, 114, 128, 0.2)` :
                    'none',
                  borderColor: isHovered ? 
                    `rgba(107, 114, 128, ${0.8 + intensity * 0.2})` : 
                    'rgb(75, 85, 99)'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}