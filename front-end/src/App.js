import React from 'react';
import { Layout, Menu } from 'antd';
import Home from './components/Home';
import Package from './components/Package';
import About from './components/About';
import API from './components/API';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div
          className="logo"
          style={{
            width: "60",
            height: "31px",
            margin: "0 16px 16px 0",
            float: "left",
          }}
        >
          <img height="32" src={logo} className="App-logo" alt="logo" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/package">Package</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/api">API</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/about">About</Link></Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/package">
            <Package />
          </Route>
          <Route path="/api">
            <API />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Dmytro Uchkin © 2020 Lviv Polytechnic National University{" "}
      </Footer>
    </Layout>
  );
}

export default App;
