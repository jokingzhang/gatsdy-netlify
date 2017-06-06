import React from 'react'
import moment from 'moment'
import $ from 'jquery';
import Helmet from "react-helmet"
import ReadNext from '../components/ReadNext'
import { config } from 'config'

import '../scss/zenburn.scss'
import '../scss/container.scss'

class MarkdownWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    var _node = $(this.props.route.page.data.body);
    var _arr = _node.filter(":header");
    //这里暂时只支持一级标题
    //有一个标题列表，按层级1~6来嵌套
    // while(_arr.length > 0) {

    // }
  }

  render () {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div className="markdown c-content">
        <Helmet
          title={`${post.title} | ${config.blogTitle}`}
        />
        <h1 style={{marginTop: 0}}>{post.title}</h1>
        <div className="artical-msg">
          <span>发表时间：{moment(post.date).format('MMMM D, YYYY')}</span>|
          <span>分类：{post.categories}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <div className="tag">标签：{post.tags}</div>
        <hr/>
        <ReadNext post={post} pages={route.pages} />
      </div>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
