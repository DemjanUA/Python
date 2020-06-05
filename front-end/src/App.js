import React from 'react';
import { Layout, Menu } from 'antd';
import Home from './components/Home';
import logo from './logo.svg';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" style={{
          width: "60",
          height: "31px",
          margin: "0 16px 16px 0",
          float: "left",
        }}>
          <img height="32" src={logo} className="App-logo" alt="logo" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Manual</Menu.Item>
          <Menu.Item key="3">Contact me</Menu.Item>
          <Menu.Item key="4">About</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Home />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
