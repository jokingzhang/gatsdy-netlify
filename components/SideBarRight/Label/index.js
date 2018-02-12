import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'
import uniq from 'lodash/uniq';
import '../sidebar.scss'

export default class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];
    let blogTags = [];
    this.props.pages.map(page => {

      if (page.data && page.data.tags && page.data.tags.length > 0) {
        blogTags = blogTags.concat(page.data.tags);
      }

    })

    blogTags = uniq(blogTags);

    return (
      <div className="slideBlock">
        <h2 className="slideTitle">所有分类</h2>
        <div className="slideLabelWrap">
          {blogTags.map((ca, i) => (
            <Link className="slideLabel" to={prefixLink(`/archive/?t=${ca}`)} key={i}>
                {ca}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
