import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'
import './links.scss'

export default class Links extends Component {

  render() {
    return (
      <div className="links">
        <div className="link-title">
          常用网站
        </div>
        <div className="link-wrap">
          <a href="http://bestof.js.org/" title="最好的前端项目">bestof.js</a>
          <a href="https://github.com/gatsbyjs/gatsby" title="gatsby">gatsby</a>
          <a href="https://www.netlify.com/" title="netlify">netlify</a>
        </div>
      </div>
    )
  }
}
