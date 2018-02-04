import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import classnames from 'classnames';
import { config } from 'config';
import SidebarRecommend from './Recommend';
import SidebarLabel from './Label';

import './sidebar.scss';

class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classnames(className, 'siderBarRight')}>
        <SidebarRecommend data={this.props.data} pages={this.props.pages} />
        <SidebarLabel data={this.props.data} pages={this.props.pages} />
      </div>
    )
  }
}

export default Sidebar;
