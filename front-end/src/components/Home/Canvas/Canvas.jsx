import React from 'react';
import { _height, _width } from '../../../canstans';

let x = 0, y = 0;
let isMouseDown = false;

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }

    this.ref = React.createRef(null);
  }

  componentDidMount() {
    const context = this.ref.current.getContext('2d');
    this.props.host(context);

    context.fillStyle = "white";
    context.fillRect(0, 0, _width, _height);

    this.ref.current.addEventListener("mousedown", this.startDrawing);
    this.ref.current.addEventListener("mousemove", this.drawLine);
    this.ref.current.addEventListener("mouseup", this.stopDrawing);
    this.ref.current.addEventListener("mouseout", this.stopDrawing);
  }

  startDrawing = (event) => {
    if (this.props.isPaintMode) {
      isMouseDown = true;
      [x, y] = [event.offsetX, event.offsetY];
    }
  };

  stopDrawing = () => {
    if (this.props.isPaintMode) {
      isMouseDown = false;
      this.props.onDraw()
    }
  };
  
  drawLine = (event) => {
    const { color, isPaintMode, lineWidth } = this.props;
    if (isPaintMode) {
      const context = this.ref.current.getContext('2d');
      // const { state } } = this;
      context.strokeStyle = color; 
      context.lineWidth = lineWidth;
      context.lineCap = 'round';
  
      if (isMouseDown) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(newX, newY);
        context.stroke();
        x = newX;
        y = newY;
      }
    }
  };

  render = () => {
    return <canvas
      ref={this.ref}
      width="280"
      height="280"
    ></canvas>;
  };
}

export default Canvas;