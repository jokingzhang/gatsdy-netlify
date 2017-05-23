import React from 'react'
import $ from 'jquery'
import moment from 'moment'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import { config } from 'config'
import { Button } from 'antd';
import include from 'underscore.string/include'
import Bio from 'components/Bio'
import 'antd/lib/button/style';
import '../scss/icon-font.scss';
import '../scss/initialize.scss';
import '../scss/container.scss';
import '../scss/landing.scss';


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
    console.info("get:::",visiblePages[3],$(get(visiblePages[3], 'data.body')).html());
    return (
      <div className="container landing-container">
        <Helmet
          title={config.blogTitle}
          meta={[
            {"name": "description", "content": "Sample blog"},
            {"name": "keywords", "content": "blog, articles"},
          ]}
        />
        <ul className="landing-article-list">
          {visiblePages.map((page) => (
              <li
                className="landing-article-item"
                key={page.path}>
                <Link className="article-title" to={prefixLink(page.path)}>
                    {get(page, 'data.title', page.path)}
                </Link>

                <div className="article-msg">
                  <span className="msg-item">日期：{ moment(get(page, 'data.date')).format('MMMM D, YYYY') }</span> |
                  <span className="msg-item">分类：{ page.data.categories.map((item, idx) => (<span className="msg-sub-item" key={idx}>{item}</span>)) }</span> |
                  <span className="msg-item">标签：{ page.data.tags.map((item, idx) => (<span className="msg-sub-item" key={idx}>{item}</span>)) }</span>
                </div>

                {get(page, 'data.cover') ?
                (<div className="article-pic">
                    <img
                      src={require(`../images/${page.data.cover}`)}
                      alt={get(page, 'data.title')}/>
                </div>) : ""}

                <div className="article-desc">
                  { $(get(page, 'data.body')).html() || get(page, 'data.desc')}
                </div>
                <Button>
                  <Link className="icon" to={prefixLink(page.path)}>
                    more >
                  </Link>
                </Button>

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
