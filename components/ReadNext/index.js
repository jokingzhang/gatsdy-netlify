import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { prune, include as includes } from 'underscore.string'
import classnames from 'classnames';
import find from 'lodash/find'
import './readNext.scss'

class ReadNext extends React.Component {
  render () {
    const { pages, post, className } = this.props
    const { readNext, readBefore } = post
    let nextPost,beforePost
    if (readNext) {
      nextPost = find(pages, (page) =>
        includes(page.path, readNext)
      )
    }

    if (readBefore) {
      beforePost = find(pages, (page) =>
        includes(page.path, readBefore)
      )
    }
    if (!beforePost && !nextPost) {
      return React.createElement('noscript', null)
    } else {
      if(readNext) {
        nextPost = find(pages, (page) =>
          includes(page.path, readNext.slice(1, -1))
        )
      }

      if(readBefore) {
        beforePost = find(pages, (page) =>
          includes(page.path, readBefore.slice(1, -1))
        )
      }
      // Create pruned version of the body.
      // const html = nextPost.data.body
      // const body = prune(html.replace(/<[^>]*>/g, ''), 200)

      return (
        <div className={classnames(className, 'c-read-next')}>

          {beforePost? (
            <div className="read-next-wrapper-left">
              <h6 className="read-next-title">
                上一篇：
              </h6>
              <Link
                className="read-next-content"
                to={{
                  pathname: prefixLink(beforePost.path),
                  query: {
                    readNext: true,
                  },
                }}
              >
                {beforePost.data.title}
              </Link>
            </div>) : ""}

          {nextPost? (
            <div className="read-next-wrapper-right">
              <h6 className="read-next-title">
                下一篇：
              </h6>
              <Link
                className="read-next-content"
                to={{
                  pathname: prefixLink(nextPost.path),
                  query: {
                    readNext: true,
                  },
                }}
              >
                {nextPost.data.title}
              </Link>
            </div>
            ) : ""}
        </div>
      )
    }
  }
}

ReadNext.propTypes = {
  post: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array,
}

export default ReadNext
