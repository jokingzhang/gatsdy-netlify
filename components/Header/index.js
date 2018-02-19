import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
    this.state.active = -1;

    let path = this.props.pathName;
    let headerClassName = '';
    let isNotFound = (path != '/' && this.props.type != 'article' && this.props.type != 'normal') || (this.props.type == 'article' && !this.props.page);

    if (isNotFound) {
      headerClassName = 'not-found-theme';
    }

    if (path.indexOf('archive') >= 0) {
      headerClassName = 'archive-theme';
    }

    if (path.indexOf('about') >= 0) {
      headerClassName = 'about-theme';
    }

    this.props.list.forEach((lItem, lIdx) => {
      if(lItem.path == path) {
        this.state.active = lIdx + '';
      }
    })

    console.info('componentHeader::props', this.props);

    this.state.headerClass = headerClassName;
  }

  componentWillUpdate(nextProps) {
    let pathName = nextProps.pathName;
    // console.info('Sidebar::::componentWillUpdate', this.props);
    if (pathName != this.props.pathName) {

      let headerClassName = '';

      let isNotFound = (pathName != '/' && nextProps.type != 'article' && nextProps.type != 'normal') || (nextProps.type == 'article' && !nextProps.page);

      if (isNotFound) {
        headerClassName = 'not-found-theme';
      }

      if (pathName.indexOf('archive') >= 0) {
        headerClassName = 'archive-theme';
      }

      if (pathName.indexOf('about') >= 0) {
        headerClassName = 'about-theme';
      }

      this.setState({
        headerClass: headerClassName
      })
    }
  }

  selectTab(path, key) {
    let headerClassName = '';

    if (path) {
      if (path.indexOf('archive') >= 0) {
        headerClassName = 'archive-theme';
      }

      if (path.indexOf('about') >= 0) {
        headerClassName = 'about-theme';
      }
    }

    this.setState({
      active: key + '',
      headerClass: headerClassName
    });
  }

  render() {

    return (
      <Header
        id="header"
        className={classnames("headerWrap", this.state.headerClass)}>
          <h1 className="headerTitle">
            <Link
              to={prefixLink('/')}
              onClick={() => this.selectTab('/', 0)}>
              {this.props.data.blogTitle}
            </Link>
          </h1>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[this.state.active.toString()]}
            className="headerMenu">
            {
              this.props.list.map((headerItem, idx) => (
              <Menu.Item key={`${idx}`} className={this.state.active == idx ? 'active' : ''}>
                <Link
                  to={prefixLink(headerItem.path)}
                  onClick={() => this.selectTab(headerItem.path, idx)}
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


