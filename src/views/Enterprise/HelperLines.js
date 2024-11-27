import  { useEffect, useRef } from 'react';
import { useStore } from '@xyflow/react';
import PropTypes from 'prop-types';

const canvasStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 10,
  pointerEvents: 'none',
};

const storeSelector = (state) => ({
  width: state.width,
  height: state.height,
  transform: state.transform,
});

// Component to display helper lines
const HelperLinesRenderer = ({ horizontal, vertical }) => {
  const { width, height, transform } = useStore(storeSelector);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log("canvas",canvas.width);
    console.log("canvas",canvas.height);
    const ctx = canvas?.getContext('2d');
    console.log("ctx",ctx);


    if (!ctx || !canvas) {
      return;
    }

    const dpi = window.devicePixelRatio;
    console.log(dpi)
    canvas.width =1103.25;

    canvas.height =797;

    ctx.scale(dpi, dpi);
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#0041d0';

    if (typeof vertical === 'number') {


      const verticalPosition = vertical * transform[2] + transform[0];

      console.log("verticalposition",verticalPosition);

      ctx.beginPath();
      ctx.moveTo(verticalPosition, 0);
      ctx.lineTo(verticalPosition, height);
      ctx.stroke();
    }

    if (typeof horizontal === 'number') {
      const horizontalPosition = horizontal * transform[2] + transform[1];
      ctx.beginPath();
      ctx.moveTo(0, horizontalPosition);
      ctx.lineTo(width, horizontalPosition);
      ctx.stroke();
    }
  }, [width, height, transform, horizontal, vertical]);

  return <canvas ref={canvasRef} className="react-flow__canvas" style={canvasStyle} />;
};
HelperLinesRenderer.propTypes = {
  horizontal: PropTypes.number,
  vertical: PropTypes.number,
};

// Default props (optional)
HelperLinesRenderer.defaultProps = {
  horizontal: undefined,
  vertical: undefined,
};

export default HelperLinesRenderer;

