import React from 'react'
import moment from 'moment'
import Helmet from "react-helmet"
import ReadNext from '../components/ReadNext'
import { config } from 'config'

import '../scss/zenburn.scss'

class MarkdownWrapper extends React.Component {

  constructor(props) {
    super(props);
    console.info(props);
  }

  render () {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div className="markdown">
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
