import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import uniq from 'lodash/uniq';
import classnames from 'classnames';

import '../sidebar.scss';

export default class Tab extends Component {

  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);
    console.info('Tab', this.props)
  }

  handleTabClick(value) {
    this.props.onTabClick(value);
  }

  render() {
    console.info('Tab called');

    const { className } = this.props;

    return (
      <div className={classnames('slideTabBlock', className)}>
        <div onClick={(e) => this.handleTabClick(false)} className={classnames("slideTabTitle", this.props.isAnchorList ? "" : "active")}>站点概览</div>
        <div onClick={(e) => this.handleTabClick(true)} className={classnames("slideTabTitle", this.props.isAnchorList ? "active" : "")}>文章目录</div>
      </div>
    )
  }
}
