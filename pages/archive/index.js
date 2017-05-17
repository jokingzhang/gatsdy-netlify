import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import classnames from 'classNames';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import '../../scss/container.scss';

class Archive extends React.Component {

  constructor(props) {
    super(props);
    const isolationPaths = ['/about/', '/archive/', '/404.html', '/'];
    this.state = {};
    this.state.blogCategories = [];
    this.state.blogTags = [];
    this.state.articals = this.props.route.pages.filter(page => {

      if (page.data && page.data.categories && page.data.categories.length > 0) {
        this.state.blogCategories = this.state.blogCategories.concat(page.data.categories);
      }

      if (page.data && page.data.tags && page.data.tags.length > 0) {
        this.state.blogTags = this.state.blogTags.concat(page.data.tags);
      }

      if (isolationPaths.indexOf(page.path) < 0 && page.data && page.data.title) {
        page.show = true;
        return true;
      } else {
        return false;
      }
    })
    console.info('this.state.blogCategories', this.state.blogCategories)
    this.state.blogCategories = uniq(this.state.blogCategories);
    this.state.blogCategories = map(this.state.blogCategories, function(text){
      return {
        state: "default",
        text: text
      };
    })
    this.state.blogTags = uniq(this.state.blogTags);
    this.state.blogTags = map(this.state.blogTags, function(text){
      return {
        state: "default",
        text: text
      };
    })
  }

  handelSelectALL () {

  }

  handelSelectCategories (item, index) {
    if (!this.state.blogCategories[index].state || this.state.blogCategories[index].state === "disabled") {
      return;
    }
    let _state = 'default';
    let _obj = JSON.parse(JSON.stringify(this.state));
    let _text = _obj.blogCategories[index].text;
    if (_obj.blogCategories[index].state === "default") {
      _state = "active";
    } else {
      _state = "default";
    }
    _obj.blogCategories.forEach((ca) => {
      if(ca.state === "active") {
        ca.state = "default";
      }
    })
    _obj.blogCategories[index].state = _state;

    _obj.articals.forEach((item) => {
      if(get(item, 'data.categories').indexOf(_text) >= 0) {
        item.show = true;
      } else {
        item.show = false;
      }
    })
    console.info(_obj);
    this.setState(_obj);
  }

  handelSelectTags(item, index) {
    if (!this.state.blogTags[index].state || this.state.blogTags[index].state === "disabled") {
      return;
    }
    let _state = 'default';
    let _obj = JSON.parse(JSON.stringify(this.state));
    if (_obj.blogTags[index].state === "default") {
      _state = "active";
    } else {
      _state = "default";
    }

    _obj.blogTags[index].state = _state
    this.setState(_obj);
  }

  render () {

    return (
      <div className="archive-container">
        <div className="selection-wrap">

          <div className="btn-wrap">
            <div className="title">Reset</div>
            <div className="btn-group">
              <div className="btn" onClick={this.handelSelectALL}>ALL</div>
            </div>
          </div>
          <div className="btn-wrap">
            <div className="title">分类筛选</div>
            <div className="btn-group">
              {this.state.blogCategories.map((item, idx) => (
                <span key={idx} className={classnames('btn', get(item, 'state'))} onClick={() => this.handelSelectCategories(item, idx)}>{ get(item, 'text') }</span>
              ))}
            </div>
          </div>

          <div className="btn-wrap">
            <div className="title">标签筛选</div>
            <div className="btn-group">
              {this.state.blogTags.map((item, idx) => (
                <span key={idx} className={classnames('btn', get(item, 'state'))} onClick={() => this.handelSelectTags(item, idx)}>{ get(item, 'text') }</span>
              ))}
            </div>
          </div>
        </div>

        <div className="list-wrap">
          {this.state.articals.map((page) => (
            <Link className={page.show ? 'show' : 'hide'} to={prefixLink(page.path)}>
              <span>日期：{ get(page, 'data.date') }</span> |
              <span>分类：{ get(page, 'data.categories') }</span> |
              <span>标签：{ get(page, 'data.tags') }</span> |
              {get(page, 'data.title')}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default Archive

exports.data = {
  title: "Archive page",
  date: "2017-05-09T09:03:02+08:00",
}
