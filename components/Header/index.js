import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'

import './header.scss'

class Header extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div className="headerWrap">
        <h1 className="headerTitle">
          <Link
                to={prefixLink('/')}>
            {this.props.data.blogTitle}
          </Link>
        </h1>
        <ul className="headerList">
          <li>
            <Link
              to={prefixLink('/')}>
            首页
            </Link>
          </li>
          <li>
            <Link
              to={prefixLink('/about/')}>
            关于
            </Link>
          </li>
          <li>
            <Link
              to={prefixLink('/archive/')}>
             归档
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;
