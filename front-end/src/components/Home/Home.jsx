import React from 'react';
import axios from 'axios'
import { Row, Col, Slider, Button, Switch, Divider } from 'antd';
import { first } from 'lodash';
import Uploader from '../Uploader';
import Canvas from './Canvas';
import { SERVER_URL } from '../../_config';
import CheckableButton from '../CheckableButton';
import { _height, _width } from '../../canstans';
import ColorPicker from '../ColorPicker';
import Paper from '../Paper';
import io from 'socket.io-client';


import './Home.css';

const grayscale = {
  r: 0.299,
  g: 0.587,
  b: 0.114,
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '-',
      context: null,
      isPaintMode: false,
      color: '#000',
      lineWidth: 8,
      imageScale: 10,
      isSocketMode: false,
    }

    this.outputCanvas = React.createRef(null);
    this.output28Canvas = React.createRef(null);
    this.outputContext = null;
    this.output28Context = null;
    console.log('-> connections created')
    this.socket = io('http://127.0.0.1:8000');
  }

  componentDidMount() {
    this.outputContext = this.outputCanvas.current.getContext('2d');
    this.output28Context = this.output28Canvas.current.getContext('2d');

    this.socket.on('connect', () => {
      console.log('-> conected')
      // setInterval(() => {
      //   socket.emit('query', {data: 'I\'m connected!'});
      //   console.log('query')
      // }, 2000)
    });

    this.socket.on('response', ({ response }) => {
      this.setState({ number: response })
    });
  }

  onImageApply = url => {
    console.log(url)

    const { state: { context }, output28Context, outputContext } = this;
    const { imageScale } = this.state;

    const img = new Image();

    img.addEventListener("load", () => {
      context.drawImage(
        img,
        _width / 2 - (img.width * imageScale) / 2,
        _height / 2 - (img.height * imageScale) / 2,
        img.width * imageScale,
        img.height * imageScale
      );

      // ---------
      this.onDraw()
    });
    img.src = url;
  }

  onImageUpload = e => {
    const { state: { context }} = this;
    const { imageScale } = this.state;
    const { nativeEvent: { target } } = e;

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

          // ---------
          this.onDraw()
        });

        img.src = event.target.result;
      };

      fileReader.readAsDataURL(first(target.files));
    }
  }

  handleHTTPRecognition = () => {
    const { output28Context, outputContext } = this;
    var bitmap28 = output28Context.getImageData(0, 0, _width / 10, _height / 10);
    var bitmap28Data = bitmap28.data;
    var bitmap28Greyscale = [];
    // outputContext.putImageData(bitmap28, 0, 0);
    
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
      baseURL: SERVER_URL,
      url: '/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(bitmap28Greyscale)
    }).then(({ data }) => {
      this.setState({ number: data })
    }).catch(error => console.log(error))
  }

  handleSocketRecognition = () => {
    const { output28Context } = this;
    var bitmap28 = output28Context.getImageData(0, 0, _width / 10, _height / 10);
    var bitmap28Data = bitmap28.data;
    var bitmap28Greyscale = [];
    
    for (var i = bitmap28Data.length - 1; i > 0; i -= 4) {
      const value = grayscale.r * bitmap28Data[i - 3] + grayscale.g * bitmap28Data[i - 2] + grayscale.b * bitmap28Data[i - 1];
      bitmap28Greyscale.push(value);
    }
    bitmap28Greyscale.reverse()

    this.socket.emit('query', JSON.stringify(bitmap28Greyscale));
  }


  onScaleChange = (scale) => {
    const prevScale = this.state.imageScale;
    this.setState({ imageScale: scale });

    ///.....
  }

  onDraw = (type) => {
    const { state: { context }, outputContext, output28Context } = this;
    const imageData = context.getImageData(0, 0, _width, _height);
    const arraylength = _width * _height * 4;

    var data = imageData.data;
    for (var i = arraylength - 1; i > 0; i -= 4) {
      //R= i-3, G = i-2 and B = i-1
      //Get our gray shade using the formula
      var gray =
        grayscale.r * data[i - 3] +
        grayscale.g * data[i - 2] +
        grayscale.b * data[i - 1];
      //Set our 3 RGB channels to the computed gray.
      data[i - 3] = gray;
      data[i - 2] = gray;
      data[i - 1] = gray;
    }
    outputContext.putImageData(imageData, 0, 0);
    // --------------
    output28Context.drawImage(
      this.outputCanvas.current,
      0,
      0,
      _width / 10,
      _height / 10
    );

    if (type === 'clear') {
      this.setState({ number: '-' });
      return;
    }

    if (this.state.isSocketMode) {
      this.handleSocketRecognition()
    }
  }

  onClear = () => {
    const { state: { context }} = this;

    context.fillStyle = "white";
    context.fillRect(0, 0, _width, _height);
    this.onDraw('clear');
  }

  render() {
    const { state: { lineWidth, color, isPaintMode } } = this;

    return (
      <Paper>
        <div className="home__page-wrapper">
          <Row gutter={[16, 24]}>
            <Col span={6}>
              <Canvas
                host={(context) => this.setState({ context: context })}
                color={color}
                lineWidth={lineWidth}
                isPaintMode={isPaintMode}
                onDraw={this.onDraw}
              />
              <Row>
                <Col span={4} offset={6}>
                  <CheckableButton
                    type="highlightOutlined"
                    checked={this.state.isPaintMode}
                    onClick={() =>
                      this.setState({ isPaintMode: !this.state.isPaintMode })
                    }
                  />
                </Col>
                <Col span={4}>
                  <CheckableButton
                    type="deleteOutlined"
                    onClick={this.onClear}
                  />
                </Col>
                <Col span={4}>
                  <ColorPicker
                    color={this.state.color}
                    onChangeComplete={(color) =>
                      this.setState({ color: color.hex })
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col span={18} offset={3}>
                  <h5 className="slider__title">Scale</h5>
                  <Slider
                    min={0.1}
                    max={12}
                    marks={{
                      12: "12",
                    }}
                    onChange={(scale) => this.onScaleChange(scale)}
                    value={this.state.imageScale}
                    step={0.1}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={18} offset={3}>
                  <h5 className="slider__title">Line size</h5>
                  <Slider
                    min={1}
                    max={14}
                    marks={{
                      14: "14",
                    }}
                    onChange={(size) => this.setState({ lineWidth: size })}
                    value={this.state.lineWidth}
                    step={1}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <canvas ref={this.outputCanvas} width="280" height="280"></canvas>
              <Row justify="center" style={{ paddingTop: '16px' }}>
                <Col>
                  <canvas
                    ref={this.output28Canvas}
                    width="28"
                    height="28"
                  ></canvas>
                </Col>
              </Row>
              <Row justify="center" >
                <Col>
                  <h2 style={{ fontSize: '46px' }}>{this.state.number}</h2>
                </Col>
              </Row>
            </Col>
            <Col>
              <Divider type="vertical" style={{ height: '100%', marginLeft: '51px', marginRight: '102px' }} />
            </Col>
            <Col span={9}>
              <Uploader onImageApply={this.onImageApply} />
            </Col>
          </Row>
          <Row gutter={[16, 46]} align="middle" style={{ paddingTop: '48px' }}>
            <Col span={4} offset={10}>
              <Button
                disabled={this.state.isSocketMode}
                type="primary"
                size="large"
                block
                onClick={this.handleHTTPRecognition}
              >
                Recognize
              </Button>
            </Col>
            <Col span={3}>
              <Switch
                defaultChecked={this.state.isSocketMode}
                unCheckedChildren="RT"
                onChange={(value) => this.setState({ isSocketMode: value })}
              />
            </Col>
          </Row>
        </div>
      </Paper>
    );
  }
}

export default Home;
