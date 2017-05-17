import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import Helmet from "react-helmet"
import { config } from 'config'
import include from 'underscore.string/include'
import Bio from 'components/Bio'

import '../scss/icon-font.scss';
import '../scss/initialize.scss';
import '../scss/container.scss';


class BlogIndex extends React.Component {
  render () {
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, 'data.date')
    // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
    // const visiblePages = sortedPages.filter(page => (
    //   get(page, 'file.ext') === 'md' && !include(page.path, '/404') || get(page, 'data.date')
    // ))

    const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];

    const visiblePages = sortedPages.filter(page => {
      if (isolationPaths.indexOf(page.path) < 0 && page.data && page.data.title) {
        return true;
      } else {
        return false;
      }
    })
    console.info("get:::",get(visiblePages[4], 'data.body'));
    return (
      <div className="landing-container">
        <Helmet
          title={config.blogTitle}
          meta={[
            {"name": "description", "content": "Sample blog"},
            {"name": "keywords", "content": "blog, articles"},
          ]}
        />
        <Bio />
        <ul>
          {visiblePages.map((page) => (
              <li
                key={page.path}
                style={{
                    marginBottom: rhythm(1/4),
                }}
              >
                <Link to={prefixLink(page.path)}>
                    {get(page, 'data.title', page.path)}
                </Link>

                <div className="pageMsg">
                  <span>日期：{ get(page, 'data.date') }</span> |
                  <span>分类：{ get(page, 'data.categories') }</span> |
                  <span>标签：{ get(page, 'data.tags') }</span>
                </div>

                {get(page, 'data.cover') ?
                (<div className="pagePic">
                    <img
                      src={require(`../images/${page.data.cover}`)}
                      alt={get(page, 'data.title')}/>
                </div>) : ""}

                <div className="pageDesc">
                  { $(get(page, 'data.body')).find('p').html() }
                </div>

                <Link to={prefixLink(page.path)}>
                    more >
                </Link>
                <hr/>
              </li>
          ))}
        </ul>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
