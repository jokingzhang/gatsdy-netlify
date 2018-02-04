import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import uniq from 'lodash/uniq';

import '../sidebar.scss';

export default class Recommend extends Component {

  static propTypes = {
    data: PropTypes.object,
    pages: PropTypes.array
  }

  static defaultProps = {
    data: {},
    pages: []
  }

  constructor(props) {
    super(props);

    console.info('Recommend', this.props)
  }

  render() {
    const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];
    const articals = this.props.pages.filter(page => {
      if (isolationPaths.indexOf(page.path) < 0 && page.data && page.data.title && page.data.recommend) {
        return true;
      } else {
        return false;
      }
    })

    console.info('Recommend==>articals', articals);

    return (
      <div className="slideBlock">
        <h2 className="slideTitle">热门文章</h2>
        {articals.map((article, i) => (
          <Link className="slideArticle" to={prefixLink(article.path)} key={i}>
            {article.data.title}
          </Link>
        ))}
      </div>
    )
  }
}
