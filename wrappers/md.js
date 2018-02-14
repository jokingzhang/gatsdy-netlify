import React from 'react';
import moment from 'moment';
import $ from 'jquery';
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
import '../scss/zenburn.scss'
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
    const fullPath = `https://jokingzhang.netlify.com/${window.location.pathname}`;
    console.info('post', post, config)
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
              <div className="msg-item-content">{ post.tags.map((item, idx) => (<Link to={prefixLink(`/archive/?t=${item}`)} onClick={this.handelTagClick} className="msg-sub-item" key={idx}>{item}</Link>)) }</div>
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
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
