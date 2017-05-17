import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'
import { config } from 'config';
import SidebarProfile from './Profile';
import SidebarLabel from './Label';
import SidebarLink from './Link';

import './sidebar.scss'

class Sidebar extends Component {

  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <SidebarProfile data={this.props.data} pages={this.props.pages} />
        <SidebarLabel data={this.props.data} pages={this.props.pages} />
        <SidebarLink/>
      </div>
    )
  }
}

export default Sidebar;
