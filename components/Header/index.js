import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import { Layout, Menu } from 'antd';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';
import './header.scss';

const { Header } = Layout;

export default class componentHeader extends Component{

  constructor(props) {
    super(props);
    this.state = {};

    this.state.selectedKey = "1";

    if(this.props.pathName === "/about/") {
      this.state.selectedKey = "2";
    }

    if(this.props.pathName === "/archive/") {
      this.state.selectedKey = "3";
    }
  }

  render() {
    return (
      <Header
        id="header"
        className="headerWrap"
        theme="light">
          <h1 className="headerTitle">
            <Link
              to={prefixLink('/')}>
              {this.props.data.blogTitle}
            </Link>
          </h1>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[this.state.selectedKey]}
            className="headerMenu">
            <Menu.Item key="1">
              <Link
                to={prefixLink('/')}>
                首页
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link
                to={prefixLink('/about/')}>
                关于
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link
                to={prefixLink('/archive/')}>
                归档
              </Link>
            </Menu.Item>
          </Menu>
      </Header>
    )
  }
}


