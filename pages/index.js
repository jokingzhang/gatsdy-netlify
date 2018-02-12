import React, { Component, PropTypes } from 'react';
import $ from 'jquery'
import moment from 'moment'
import classnames from 'classnames';
import { browserHistory, Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import { config } from 'config'
import { Button, Breadcrumb, Layout, BackTop, Pagination } from 'antd';
import include from 'underscore.string/include'
import Bio from 'components/Bio'
import 'antd/lib/pagination/style';
import 'antd/lib/button/style';
import '../scss/icon-font.scss';
import '../scss/initialize.scss';
import '../scss/container.scss';
import '../scss/landing.scss';

const { Content } = Layout;
const maxPageSize = 5;
const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];
class BlogIndex extends Component {
  constructor(props) {
    super(props);
    const sortedPages = sortBy(this.props.route.pages, 'data.date');

    let pageNumber = 1;
    if (this.props.location.query && this.props.location.query.page && /^[0-9]*[1-9][0-9]*$/.test(this.props.location.query.page)) {
      pageNumber = this.props.location.query.page - 0;
    }

    let visiblePages = sortedPages.filter(page => {
      if (isolationPaths.indexOf(page.path) < 0 && page.data && page.data.title) {
        return true;
      } else {
        return false;
      }
    })
    let totalPages = JSON.parse(JSON.stringify(visiblePages));
    let pageLength = visiblePages.length;
    visiblePages = visiblePages.filter((page, pageIdx) => {
      let _pageNum = Math.floor(pageIdx/maxPageSize);
      _pageNum+=1;
      if (_pageNum === pageNumber) {
        return true;
      } else {
        return false
      }
    })

    this.state = {
      totalPages: totalPages,
      visiblePages: visiblePages,
      currentPage: pageNumber,
      totalPage: pageLength,
      pageSize: maxPageSize
    }

    this.onPageChange = this.onPageChange.bind(this);

    console.info(this.state);
  }

  handelTagClick(e) {
    // e.preventDefault();
    // console.info("handelTagClick called", e);
  }

  onPageChange(pageNum) {
    console.info("onPageChange===>", pageNum);

    browserHistory.push('/?page=' + pageNum);

    let pageNumber = pageNum;

    let pageLength = this.state.totalPages.length;

    let visiblePages = this.state.totalPages.filter((page, pageIdx) => {
      let _pageNum = Math.floor(pageIdx/maxPageSize);
      _pageNum+=1;
      if (_pageNum === pageNumber) {
        return true;
      } else {
        return false
      }
    })

    var res = {
      totalPages: this.state.totalPages,
      visiblePages: visiblePages,
      currentPage: pageNumber,
      totalPage: pageLength,
      pageSize: maxPageSize
    }

    this.setState(res)

  }

  render () {

    return (
      <div className="container landing-container">
        <Helmet
          title={config.blogTitle}
          meta={[
            {"name": "description", "content": "Sample blog"},
            {"name": "keywords", "content": "blog, articles"},
          ]}
        />
        <Content className="c-content">
          <ul className="landing-article-list">
            {this.state.visiblePages.map((page) => (
                <li
                  className="landing-article-item"
                  key={page.path}>
                  <Link className="article-title" to={prefixLink(page.path)}>
                      {get(page, 'data.title', page.path)}
                  </Link>

                  <div className="article-msg">

                    <div className="msg-item-wrapper">
                      <h4 className="msg-item-title">日期：</h4>
                      <div className="msg-item-content">{ moment(get(page, 'data.date')).format('YYYY年MM月DD日') }</div>
                    </div>

                    <div className="msg-item-wrapper">
                      <h4 className="msg-item-title">标签：</h4>
                      <div className="msg-item-content">{ page.data.tags.map((item, idx) => (<Link to={prefixLink(`/archive/?t=${item}`)} onClick={this.handelTagClick} className="msg-sub-item" key={idx}>{item}</Link>)) }</div>
                    </div>

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
                  <Link className="article-btn" to={prefixLink(page.path)}>
                    查看全文
                  </Link>

                </li>
            ))}
          </ul>
          <Pagination
            className="pagination-wrapper"
            current={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={this.state.totalPage}
            data={this.state}
            onChange={this.onPageChange}/>
        </Content>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
