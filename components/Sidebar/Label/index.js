import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'
import uniq from 'lodash/uniq';

import './label.scss'

export default class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];
    let blogCategories = [];
    const articals = this.props.pages.filter(page => {

      if (page.data && page.data.categories && page.data.categories.length > 0) {
        blogCategories = blogCategories.concat(page.data.categories);
      }

      if (isolationPaths.indexOf(page.path) < 0 && page.data && page.data.title) {
        return true;
      } else {
        return false;
      }

    })

    blogCategories = uniq(blogCategories);

    return (
      <div className="label">
        <div className="label-title">所有分类</div>
        <div className="label-wrap">
          {blogCategories.map((ca, i) => (
            <Link to={prefixLink("/archive/")} key={i}>
                {ca}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
