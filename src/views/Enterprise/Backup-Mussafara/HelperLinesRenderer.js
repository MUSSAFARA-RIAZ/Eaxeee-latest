import React, { useEffect, useRef, useState } from 'react';

const canvasStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 10,
  pointerEvents: 'none',
};

function HelperLinesRenderer({ horizontal, vertical }) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const canvasRef = useRef(null);

  // Handle window resize to adjust canvas size
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
  
    if (!ctx || !canvas) return;
  
    // Set up device pixel ratio for high-resolution displays
    const dpi = window.devicePixelRatio;
    canvas.width = dimensions.width * dpi;
    canvas.height = dimensions.height * dpi;
    ctx.scale(dpi, dpi);  // Apply scale to the canvas context for high-DPI devices
  
    // Clear the canvas before drawing new lines
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.strokeStyle = '#0041d0';
  
    // Draw vertical helper line if vertical is defined
    if (typeof vertical === 'number') {
      ctx.beginPath();
      ctx.moveTo(vertical, 0);
      ctx.lineTo(vertical, dimensions.height);
      ctx.stroke();
    }
  
    // Draw horizontal helper line if horizontal is defined
    if (typeof horizontal === 'number') {
      ctx.beginPath();
      ctx.moveTo(0, horizontal);
      ctx.lineTo(dimensions.width, horizontal);
      ctx.stroke();
    }
  }, [dimensions, horizontal, vertical]);
  

  return <canvas ref={canvasRef} className="react-flow__canvas" style={canvasStyle} />;
}

export default HelperLinesRenderer;
