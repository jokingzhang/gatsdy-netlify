import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import { config } from 'config';
import { Pagination } from 'antd';
import classnames from 'classNames';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import intersectionWith from 'lodash/intersectionWith';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import Tags from './Tags';
import List from './List';
import '../../scss/container.scss';
import './archive.scss';

const maxPageSize = 10;
const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];

class Archive extends React.Component {

  constructor(props) {
    super(props);
    let tag = this.props.location.query.t;
    let tags = [];
    let blogTags = [];
    let pageNumber = 1;

    this.props.route.pages.map(page => {
      if (page.data && page.data.tags && page.data.tags.length > 0) {
        tags = tags.concat(page.data.tags);
      }
    })

    tags = uniq(tags);

    blogTags.push({
      title: '全部',
      tag: '',
      active: this.props.location.query.t ? false : true
    })

    tags.forEach((tag, tIdx) => {

      blogTags.push({
        title: tag,
        tag: tag,
        active: this.props.location.query.t == tag ? true : false
      })
    })

    let list = filter(this.props.route.pages, (page) => {
      if(page && page.data && page.data.tags && page.data.tags.length > 0 &&  page.data.tags.indexOf(tag) >= 0) {
        return true;
      }
    })

    if (!tag) {
      list = filter(this.props.route.pages, (page) => {
        console.info(page.path)
        if(page && page.path && page.data.title && isolationPaths.indexOf(page.path) < 0) {
          return true;
        }
      })
    }

    list = list.sort((a,b) => {
      if (a.data.date > b.data.date) {
        return -1;
      } else if(a.data.date < b.data.date){
        return 1;
      } else {
        return 0;
      }
    })

    let visiblePages = list.filter((page, pageIdx) => {
      let _pageNum = Math.floor(pageIdx/maxPageSize);
      _pageNum+=1;
      if (_pageNum === pageNumber && page.hide != 'hide' && page.data.hide != 'hide') {
        return true;
      } else {
        return false
      }
    })


    console.info('List', this.props, list);

    console.info('tags', blogTags, this.props);

    this.state = {
      tags: blogTags,
      totalList: list,
      list: visiblePages,
      currentPage: 1,
      pageSize: maxPageSize,
      totalPage: list.length,
    }
    console.info("Archive::props", this.props);

    this.onPageChange = this.onPageChange.bind(this);
  }

  setPage (location) {
    console.info('setPage called');
    let tag = location.query.t;
    let tags = [];
    let blogTags = [];
    let pageNumber = 1;

    this.props.route.pages.map(page => {
      if (page.data && page.data.tags && page.data.tags.length > 0) {
        tags = tags.concat(page.data.tags);
      }
    })

    tags = uniq(tags);

    blogTags.push({
      title: '全部',
      tag: '',
      active: location.query.t ? false : true
    })

    tags.forEach((tag, tIdx) => {

      blogTags.push({
        title: tag,
        tag: tag,
        active: location.query.t == tag ? true : false
      })
    })

    let list = filter(this.props.route.pages, (page) => {
      if(page && page.data && page.data.tags && page.data.tags.length > 0 &&  page.data.tags.indexOf(tag) >= 0) {
        return true;
      }
    })

    if (!tag) {
      list = filter(this.props.route.pages, (page) => {
        console.info(page.path)
        if(page && page.path && page.data.title && isolationPaths.indexOf(page.path) < 0) {
          return true;
        }
      })
    }

    list = list.sort((a,b) => {
      if (a.data.date > b.data.date) {
        return -1;
      } else if(a.data.date < b.data.date){
        return 1;
      } else {
        return 0;
      }
    })

    let visiblePages = list.filter((page, pageIdx) => {
      let _pageNum = Math.floor(pageIdx/maxPageSize);
      _pageNum+=1;
      if (_pageNum === pageNumber && page.hide != 'hide' && page.data.hide != 'hide') {
        return true;
      } else {
        return false
      }
    })

    console.info('List', this.props, list);

    console.info('tags', blogTags, this.props);

    let _state = {
      tags: blogTags,
      totalList: list,
      list: visiblePages,
      currentPage: 1,
      pageSize: maxPageSize,
      totalPage: list.length,
    }

    this.setState(_state);
  }

  componentWillUpdate(nextProps) {
    console.info('Archive::componentWillUpdate==>', nextProps, this.props);
    if (nextProps.location.search != this.props.location.search) {
      this.setPage(nextProps.location);
    }
  }

  onPageChange (pageNum) {
    let pageNumber = pageNum;

    let pageLength = this.state.totalList.length;

    let visiblePages = this.state.totalList.filter((page, pageIdx) => {
      let _pageNum = Math.floor(pageIdx/maxPageSize);
      _pageNum+=1;
      if (_pageNum === pageNumber) {
        return true;
      } else {
        return false
      }
    })

    let res = {
      list: visiblePages,
      currentPage: pageNumber,
      totalPage: pageLength,
    }

    this.setState(res)
  }

  render () {

    return (
      <div className="c-content archive-container">
        <Tags className={classnames('container-tags')} data={this.state.tags} />
        <List className={classnames('container-list')} data={this.state.list} />
        <div className="container-pagination">
          <Pagination
            className="pagination-wrapper"
            current={this.state.currentPage}
            pageSize={this.state.pageSize}
            total={this.state.totalPage}
            data={this.state}
            onChange={this.onPageChange}/>
        </div>
      </div>
    )
  }
}

export default Archive

exports.data = {
  title: "Archive page",
  type: "only",
  date: "2017-05-09T09:03:02+08:00",
}
