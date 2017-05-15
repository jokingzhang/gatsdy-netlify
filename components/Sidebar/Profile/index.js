import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'

class Profile extends Component {

  static propTypes = {
    data: PropTypes.object
  }

  static defaultProps = {
    data: {}
  }

  constructor(props) {
    super(props);
    console.info(this.props.data);
  }

  render() {
    const authorImage = require(`../../../images/${this.props.data.authorImage}`);

    // console.info("authorImage==>", authorImage);
    return (
      <div className="profile">
        <h1>个人信息</h1>
        <img src={authorImage} alt={this.props.data.authorName}/>
        <p>{this.props.data.authorName}</p>
        <p>{this.props.data.authorDesc}</p>
        <div className="profile-classify">
          <div className="classify-item">
            <div className="classify-item-num">3</div>
            <div className="classify-item-title">分类</div>
          </div>
          <div className="classify-item">
            <div className="classify-item-num">3</div>
            <div className="classify-item-title">标签</div>
          </div>
          <div className="classify-item">
            <div className="classify-item-num">3</div>
            <div className="classify-item-title">文章</div>
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

export default Profile;
