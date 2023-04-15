import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData } from './reducers/yourReducer';
import { useGMapsResponse } from './dataSelector';
import { AppDispatch } from './store';

interface Point {
  x: number;
  y: number;
}

interface Edge {
  a: Point;
  b: Point;
}


const canvasWidth = 400;
const canvasHeight = 400;


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const gMapsResponse = useGMapsResponse();
  console.log("data", gMapsResponse);

  const [points, setPoints] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints([...points, {x, y}]);
  };


  const drawPoint = (context: CanvasRenderingContext2D, x: number, y: number) => {
    console.log("--------------------");
    console.log('drawPoint', x, y);
    const paddingLeft = 10;
    const paddingTop = 10;
    let canvasX = x * 20 + paddingLeft;
    let canvasY = canvasHeight - (y * 20 + paddingTop);
    console.log('canvasX', canvasX);
    console.log('canvasY', canvasY);
    console.log("--------------------");

    context.fillStyle = 'black';
    context.beginPath();
    const radius = 3;
    // The starting angle at 0 radians, which is the 3 o'clock position.
    const startAngle = 0;
    const endAngle = 2 * Math.PI;
    // The ending angle, representing a full circle (360 degrees, or 2π radians).
    context.arc(canvasX, canvasY, radius, startAngle, endAngle);
    context.fill();

     // Draw label
     const label = `(${x}, ${y})`;
     context.font = '10px Arial';
     context.fillStyle = 'black';
     context.fillText(label, canvasX - 8, canvasY + 15);
  }

  const drawLine = (
    context: CanvasRenderingContext2D, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number,
    strokeStyle: string = 'black',
  ) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = strokeStyle;
    context.lineWidth = 1;
    context.stroke();
  }

  useEffect(() => {
    async function getData() {
      try {
        dispatch(getAllData());
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    }
    void getData();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const paddingLeft = 10;
    const paddingTop = 10;
    
    gMapsResponse.vicinityPaths.forEach((vector) => {

      drawPoint(context, vector.a.x, vector.a.y);
      drawPoint(context, vector.b.x, vector.b.y);

      const srcX = vector.a.x * 20 + paddingLeft;
      const srcY = canvasHeight - (vector.a.y * 20 + paddingTop);
      const destX = vector.b.x * 20 + paddingLeft;
      const destY = canvasHeight - (vector.b.y * 20 + paddingTop);

      drawLine(context, srcX, srcY, destX, destY);
    });

    if(gMapsResponse.shortestPaths.length > 0) {
      gMapsResponse.shortestPaths.forEach((edge) => {
        const srcX = edge.a.x * 20 + paddingLeft;
        const srcY = canvasHeight - (edge.a.y * 20 + paddingTop);
        const destX = edge.b.x * 20 + paddingLeft;
        const destY = canvasHeight - (edge.b.y * 20 + paddingTop);
  
        drawLine(context, srcX, srcY, destX, destY, 'red');
      });
    }
    
  }, [gMapsResponse]);

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