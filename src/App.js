import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData } from './reducers/yourReducer';
import { useData } from './dataSelector';

const canvasWidth = 400;
const canvasHeight = 400;


function App() {
  const dispatch = useDispatch();
  const data = useData();
  console.log("data", data);

  const[points, setPoints] = useState([]);
  const [edges, setEdges] = useState([]);
  const canvasRef = useRef(null);

  
  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints([...points, {x, y}]);
  };


  const drawPoint = (context, x, y) => {
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

  const drawLine = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.stroke();
  }

  useEffect(() => {
    async function getData() {
      // if (!data.length) {
        await dispatch(getAllData());
      // }
    }
    void getData();
  }, [data.length]);

  // useEffect(() => {
  //   const generateEdges = () => {
  //     const newEdges = [];

  //     setEdges(newEdges);
  //   };

  //   generateEdges();
  // }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const paddingLeft = 10;
    const paddingTop = 10;
    console.log("data", data);
    console.log("data.length", data.length);
    if(data.length > 0) {
      data.forEach((edge) => {
        console.log("edge", edge);
        
        drawPoint(context, edge.a.x, edge.a.y);
        drawPoint(context, edge.b.x, edge.b.y);
  
        const srcX = edge.a.x * 20 + paddingLeft;
        const srcY = canvasHeight - (edge.a.y * 20 + paddingTop);
        const destX = edge.b.x * 20 + paddingLeft;
        const destY = canvasHeight - (edge.b.y * 20 + paddingTop);
  
        drawLine(context, srcX, srcY, destX, destY);
      });
    }
    
  }, [data.length]);

  useEffect(() => {
    
  }, [edges]);

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