import React, { useState, useRef, useEffect } from 'react';

const canvasWidth = 800;
const canvasHeight = 600;

function App() {
  const[points, setPoints] = useState([]);
  const canvasRef = useRef(null);

  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints([...points, {x, y}]);
  };

  const drawPoint = (context, x, y) => {
    context.fillStyle = 'black';
    context.beginPath();
    const radius = 5;
    // The starting angle at 0 radians, which is the 3 o'clock position.
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    // The ending angle, representing a full circle (360 degrees, or 2π radians).
    context.arc(x, y, radius, startAngle, endAngle);
    context.fill();
  }

  const drawLine = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.stroke();
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    points.forEach((point, index) => {
      drawPoint(context, point.x, point.y);
      if(index > 0) {
        const prevPoint = points[index - 1];
        drawLine(context, prevPoint.x, prevPoint.y, point.x, point.y);
      }
    });
  }, [points]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid black' }}
        onClick={handleClick}
      />
    </div>
  )
}

export default App;