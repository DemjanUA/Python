import React from 'react';
import Paper from '../Paper';
import { PageHeader, Divider, Button } from 'antd';

class API extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <div className="api__page-wrapper">
          <PageHeader
            className="site-page-header"
            title="Remote Neural network  API"
            subTitle="Last update: Jun 25, 2020"
          />
          <Divider>HTTP API</Divider>
          <p>Neural network supports remote access via HTTP protocol.</p>

          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> HOST: https://neural-network-app.herokuapp.com</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> URL: /</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> Method: POST</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code>
                {" "}
                Body: [253.99999999999997, 255, 255, 255, 255, 0, ..., n]
              </code>
            </pre>
          </div>
          <div>
            <Button
              type="link"
              href="https://github.com/DemjanUA/Bachelor-thesis/blob/master/back-end/curl.txt"
            >
              curl.txt
            </Button>
          </div>
          <Divider>WebSocket API</Divider>
          <p>
            Neural network supports remote access via WebSocket protocol for
            real time recognition.
          </p>

          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> HOST: wss://neural-network-app.herokuapp.com</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> URL: /</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> Request event: "query"</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <blockquote>
                socket.<font color="#660066">emit</font>
                <font color="#009900">&#40;</font>
                <font color="#3366CC">'query'</font>
                <font color="#339933">,</font>&nbsp;JSON.
                <font color="#660066">stringify</font>
                <font color="#009900">&#40;</font>data
                <font color="#009900">&#41;</font>
                <font color="#009900">&#41;</font>
                <font color="#339933">;</font>
              </blockquote>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",

                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <code> Response event: "response"</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <pre
              style={{
                margin: "0",
                padding: "16px",
                overflow: "auto",
                fontSize: "85%",
                lineHeight: "1.45",
                backgroundColor: "#f6f8fa",
                borderRadius: "6px",
                width: "600px",
                color: "#24292e",
              }}
            >
              <blockquote>
                socket.<font color="#660066">on</font>
                <font color="#009900">&#40;</font>
                <font color="#3366CC">'response'</font>
                <font color="#339933">,</font>&nbsp;
                <font color="#009900">&#40;</font>
                <font color="#009900">&#123;</font>&nbsp;response&nbsp;
                <font color="#009900">&#125;</font>
                <font color="#009900">&#41;</font>&nbsp;
                <font color="#339933">=&gt;</font>&nbsp;
                <font color="#009900">&#123;</font>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<font color="#000066">this</font>.
                <font color="#660066">setState</font>
                <font color="#009900">&#40;</font>
                <font color="#009900">&#123;</font>&nbsp;number
                <font color="#339933">:</font>&nbsp;response&nbsp;
                <font color="#009900">&#125;</font>
                <font color="#009900">&#41;</font>
                <br />
                <font color="#009900">&#125;</font>
                <font color="#009900">&#41;</font>
                <font color="#339933">;</font>
              </blockquote>
            </pre>
          </div>
          <div>
            <Button
              block
              type="link"
              href="https://github.com/DemjanUA/Bachelor-thesis"
            >
              Go to the GitHub page
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}


export default API;