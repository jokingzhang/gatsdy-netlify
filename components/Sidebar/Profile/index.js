import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import uniq from 'lodash/uniq';

import './profile.scss';

export default class Profile extends Component {

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
  }

  render() {
    const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];
    let blogCategories = [];
    let blogTags = [];
    const articals = this.props.pages.filter(page => {

      if (page.data && page.data.categories && page.data.categories.length > 0) {
        blogCategories = blogCategories.concat(page.data.categories);
      }

      if (page.data && page.data.tags && page.data.tags.length > 0) {
        blogTags = blogTags.concat(page.data.tags);
      }

      if (isolationPaths.indexOf(page.path) < 0 && page.data && page.data.title) {
        return true;
      } else {
        return false;
      }
    })

    blogCategories = uniq(blogCategories); blogCategories = blogCategories.length;
    blogTags = uniq(blogTags); blogTags = blogTags.length;
    let blogPages = articals.length;

    const authorImage = require(`../../../images/${this.props.data.authorImage}`);

    return (
      <div className="profile">
        <h1 className="profile-title">个人信息</h1>
        <img className="profile-image" src={authorImage} alt={this.props.data.authorName}/>
        <p className="profile-author-name">{this.props.data.authorName}</p>
        <p className="profile-author-desc">{this.props.data.authorDesc}</p>
        <div className="profile-classify">
          <div className="classify-item">
            <div className="classify-item-num">{blogCategories}</div>
            <Link to={prefixLink('/archive/')}>
                分类
            </Link>
          </div>
          <div className="classify-item">
            <div className="classify-item-num">{blogTags}</div>
            <Link to={prefixLink('/archive/')}>
                标签
            </Link>
          </div>
          <div className="classify-item">
            <div className="classify-item-num">{blogPages}</div>
            <Link to={prefixLink('/archive/')}>
                文章
            </Link>
          </div>
        </div>
        <div className="rrs">
          <i className="icon iconfont icon-rss1"></i>
          rss
        </div>
        <div className="profile-links">
          <div className="links-item">
            <i className="icon iconfont icon-github"></i>
          github</div>
          <div className="links-item">
            <i className="icon iconfont icon-weibo1"></i>
          weibo</div>
          <div className="links-item">
            <i className="icon iconfont icon-zhihu"></i>
          zhihu</div>
        </div>
      </div>
    )
  }
}
