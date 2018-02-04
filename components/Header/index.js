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
  }

  selectTab(key) {
    var _tmpState = {};
    _tmpState.selectedKey = key || '1';
    this.setState(_tmpState);
  }

  render() {
    const headerData = [{
      title: '首页',
      key: '1',
      link: '/'
    },{
      title: '关于',
      key: '2',
      link: '/about/'
    },{
      title: '归档',
      key: '3',
      link: '/archive/'
    }];

    return (
      <Header
        id="header"
        className="headerWrap">
          <h1 className="headerTitle">
            <Link
              to={prefixLink('/')}>
              {this.props.data.blogTitle}
            </Link>
          </h1>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[this.state.selectedKey]}
            className="headerMenu">
            {
              headerData.map((headerItem, idx) => (
              <Menu.Item key={headerItem.key} className={this.state.selectedKey == headerItem.key ? 'header-selected' : ''}>
                <Link
                  to={prefixLink(headerItem.link)}
                  onClick={() => this.selectTab(headerItem.key)}
                  >
                  {headerItem.title}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
      </Header>
    )
  }
}


