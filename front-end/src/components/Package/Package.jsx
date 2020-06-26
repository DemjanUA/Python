import React from 'react';
import { PageHeader, Button, Table } from 'antd';
import Paper from '../Paper';
import { DownloadOutlined, GithubOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Version',
    dataIndex: 'version',
    render: text => <a href={`https://pypi.org/manage/project/uchkin-diploma/release/${text}/`}>{text}</a>,
  },
  {
    title: 'Release date',
    dataIndex: 'date',
    align: 'right',
  },
  {
    title: 'Description of changes',
    dataIndex: 'description',
  },
];

const data = [
  {
    key: '1',
    version: '1.0.3',
    date: 'Jun 25, 2020',
    description: 'Minor changes',
  },
  {
    key: '2',
    version: '1.0.2',
    date: 'Jun 25, 2020',
    description: 'Stable version; Static files adding',
  },
  {
    key: '3',
    version: '1.0.1',
    date: 'Jun 09, 2020',
    description: 'Dependences adding',
  },
  {
    key: '4',
    version: '1.0.0',
    date: 'Jun 09, 2020',
    description: 'Update to work version',
  },
  {
    key: '5',
    version: '0.1',
    date: 'May 23, 2020',
    description: 'Package initialization',
  },
];


class Package extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <div className="package__page-wrapper">
          <PageHeader
            className="site-page-header"
            title="uchkin-diploma 1.0.3"
            subTitle="Released: Jun 25, 2020"
          />

          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <DownloadOutlined
              style={{
                display: "inline-flex",
                alignItems: "center",
                margin: "0 16px",
                fontSize: "18px",
                color: "gray",
              }}
            />
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
              <code> $ pip install uchkin-diploma</code>
            </pre>
          </div>
          <div
            style={{
              display: "flex",
              marginBottom: "11.9px",
            }}
          >
            <GithubOutlined
              style={{
                display: "inline-flex",
                alignItems: "center",
                margin: "0 16px",
                fontSize: "18px",
                color: "gray",
              }}
            />
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
              <code>git@github.com:DemjanUA/uchkin_diploma.git</code>
            </pre>
          </div>
          <div>
            <Table
              columns={columns}
              dataSource={data}
              bordered
              title={() => <strong>Releases (5)</strong>}
            />
          </div>
          <div>
            <Button
              block
              type="link"
              href="https://github.com/DemjanUA/uchkin_diploma"
            >
              Go to the GitHub page
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

export default Package;