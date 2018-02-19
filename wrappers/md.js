import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Anchor } from 'antd';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import cloneDeep from 'lodash/cloneDeep';
import Helmet from "react-helmet";
import classnames from 'classnames';
import ReadNext from '../components/ReadNext';
import ReactDisqusThread from "react-disqus-thread"

import 'antd/lib/anchor/style';
import '../scss/markdown.scss'
import '../scss/container.scss'
import './md.scss'

class MarkdownWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNewComment (comment) {
    console.log(comment.text);
  }

  render () {
    const { route } = this.props;
    const post = route.page.data;
    const fullPath = `https://jokingzhang.netlify.com/${route.page.path}`;
    console.info('post', post, config)

    if (post.type && post.type == 'article') {
      return (
        <div className="markdown c-content page-article">
          <Helmet
            title={`${post.title} | ${config.blogTitle}`}
          />
          <div className="article-wrapper">
            <h1 className="article-title">{post.title}</h1>

            <div className="article-msg">

              <div className="msg-item-wrapper">
                <h4 className="msg-item-title">日期：</h4>
                <div className="msg-item-content">{ moment(post.date).format('YYYY年MM月DD日') }</div>
              </div>

              <div className="msg-item-wrapper">
                <h4 className="msg-item-title">标签：</h4>
                <div className="msg-item-content">
                  {
                    !!post.tags && post.tags.length > 0 && post.tags.map((item, idx) => {
                      return (
                        <Link to={prefixLink(`/archive/?t=${item}`)} onClick={this.handelTagClick} className="msg-sub-item" key={idx}>{item}</Link>
                      )
                    })
                  }
                </div>
              </div>

            </div>

            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
          <ReactDisqusThread
            className="article-wrapper article-disqus-wrapper"
            shortname={config.shortname}
            title={`${post.title} | ${config.blogTitle}`}
            url={fullPath}
            onNewComment={this.handleNewComment}
          />
          <ReadNext className='article-wrapper article-next' post={post} pages={route.pages} />
        </div>
      )
    } else {
      return (
        <div className="markdown">
          <Helmet
            title={`${post.title} | ${config.blogTitle}`}
          />
          <div className="c-404" dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      )
    }
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
