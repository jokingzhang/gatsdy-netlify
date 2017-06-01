import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import classnames from 'classnames';
import { Layout } from 'antd';
import { config } from 'config';
import SidebarProfile from './Profile';
import SidebarLabel from './Label';
import SidebarLink from './Link';

const { Sider } = Layout;

class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { className } = this.props;

    return (
      <Sider className={classnames(className)}>
        <SidebarProfile data={this.props.data} pages={this.props.pages} />
        <SidebarLabel data={this.props.data} pages={this.props.pages} />
        <SidebarLink/>
      </Sider>
    )
  }
}

export default Sidebar;
