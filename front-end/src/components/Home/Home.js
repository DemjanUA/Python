import React from 'react';
import { Row, Col, Slider } from 'antd';
import { first } from 'lodash';
import axios from 'axios'
import Uploader from '../Uploader';

import './Home.css';

const _height = 280;
const _width = 280;
const grayscale = {
  r: 0.299,
  g: 0.587,
  b: 0.114,
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageScale: 1,
    }

    this.canvas = React.createRef(null);
    this.outputCanvas = React.createRef(null);
    this.output28Canvas = React.createRef(null);
  }
  

  onImageUpload = e => {
    const { nativeEvent: { target } } = e;
    const context = this.canvas.current.getContext('2d');
    const outputContext = this.outputCanvas.current.getContext('2d');
    const output28Context = this.output28Canvas.current.getContext('2d');

    const { imageScale } = this.state;

    if (target.files && first(target.files)) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        const img = new Image();
        img.addEventListener("load", () => {
          context.drawImage(
            img,
            _width / 2 - (img.width * imageScale) / 2,
            _height / 2 - (img.height * imageScale) / 2,
            img.width * imageScale,
            img.height * imageScale
          );

          // --------------
          var imageData = context.getImageData(0, 0, _width, _height);
          var data = imageData.data;
          var arraylength = _width * _height * 4;
          for (var i = arraylength - 1; i > 0; i -= 4) {
            //R= i-3, G = i-2 and B = i-1
            //Get our gray shade using the formula
            var gray =
              0.3 * data[i - 3] + 0.59 * data[i - 2] + 0.11 * data[i - 1];
            //Set our 3 RGB channels to the computed gray.
            data[i - 3] = gray;
            data[i - 2] = gray;
            data[i - 1] = gray;
          }
          outputContext.putImageData(imageData, 0, 0);
          // --------------

          // --------------
          output28Context.drawImage(
            this.outputCanvas.current,
            0,
            0,
            _width / 10,
            _height / 10
          );

          var bitmap28 = output28Context.getImageData(0, 0, _width / 10, _height / 10);
          var bitmap28Data = bitmap28.data;
          outputContext.putImageData(bitmap28, 0, 0);
          var bitmap28Greyscale = [];
          
          // console.log(data)
          for (var i = bitmap28Data.length - 1; i > 0; i -= 4) {
            // console.log(bitmap28Data)
            const value = grayscale.r * bitmap28Data[i - 3] + grayscale.g * bitmap28Data[i - 2] + grayscale.b * bitmap28Data[i - 1];
            bitmap28Greyscale.push(value);
          }
          bitmap28Greyscale.reverse()
          // console.log(JSON.stringify(bitmap28Greyscale))

          axios({
            method: 'post',
            baseURL: 'http://localhost:5000',
            url: '/',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify(bitmap28Greyscale)
          }).then(responce => alert(responce.data)).catch(error => console.log(error))

          // --------------
        });

        img.src = event.target.result;
      };

      fileReader.readAsDataURL(first(target.files));
    }
  }

  render() {
    return (
      <div className="home__page-wrapper">
        <Row>
          <Col span={6}>
            <canvas ref={this.canvas} width="280" height="280"></canvas>
            <Slider
              min={0}
              max={1}
              style={{ width: `${_width}px`, margin: '0 auto'}}
              onChange={this.onChange}
              value={this.state.imageScale}
              step={0.01}
            />
          </Col>
          <Col span={6}>
            <canvas ref={this.outputCanvas} width="280" height="280"></canvas>
          </Col>
          <Col span={4}>
            <canvas ref={this.output28Canvas} width="28" height="28"></canvas>
            <input id="upload" type="file" onChange={this.onImageUpload} />
          </Col>
          <Col span={8}>
            <Uploader />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;