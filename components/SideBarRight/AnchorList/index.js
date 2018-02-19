import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import { Anchor } from 'antd';
import $ from 'jquery';
import uniq from 'lodash/uniq';
import classnames from 'classnames';
import 'antd/lib/anchor/style';
import '../sidebar.scss';

export default class AnchorList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fixed : false
    };

    let _node = $(this.props.page.data.body);
    let _arr = _node.filter(":header");
    let _nodeList = this.createTree(_arr);
    // debugger;
    this.state.navList = _nodeList || [];
    console.info('Anchor', this.props, this.state)

    this.handleScroll = this.handleScroll.bind(this);
    this.handelLinkClick = this.handelLinkClick.bind(this);
  }

  componentDidMount() {
    if (this.props.isAnchorList) {
      window.document.getElementById("container").addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.props.isAnchorList) {
      window.document.getElementById("container").removeEventListener('scroll', this.handleScroll);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let path = prevProps.page.path;
    console.info('AnchorList::::componentWillReceiveProps', prevProps, this.props);
    if (path != this.props.page.path) {

      window.document.getElementById("container").addEventListener('scroll', this.handleScroll);

      let _node = $(this.props.page.data.body);
      let _arr = _node.filter(":header");
      let _nodeList = this.createTree(_arr);

      this.setState({
        fixed : false,
        navList : _nodeList || []
      })
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  handleScroll () {
    let _top = window.document.getElementById("container").scrollTop;
    // console.info("handleScroll", _top);
    if (_top >= 80) {
      this.setState({
        fixed: true
      })
    } else {
      this.setState({
        fixed: false
      })
    }
  }

  handelLinkClick (id, e) {
    console.info("id===>", id);
    this._scrollTo(id);
  }

  _scrollTo(href) {
    let targetElement = document.getElementById(href);
    if (!targetElement) {
        return;
    }
    let eleOffsetTop = targetElement.offsetTop;
    console.info("_scrollTo==>", eleOffsetTop);
    window.document.getElementById("container").scrollTo({top: eleOffsetTop})
  }

  createTree (data, result = [], _thisHeading = null) {

    console.info("_arr==>", data);

    if(data.length > 0) {
      let _nextHeading = data.splice(0, 1);
      if (_nextHeading[0]) {
        _nextHeading = _nextHeading[0];
      }
      console.info("_nextHeading.id===>", _nextHeading.id);
      console.info("_nextHeading.nodeName===>", _nextHeading.nodeName);
      console.info("_nextHeading.innerText===>", _nextHeading.innerText);

      // _thisHeading == null 代表第一次进入递归
      if (!_thisHeading || (_thisHeading.nodeName >= _nextHeading.nodeName)) {

        let item = {
          dom: _nextHeading,
          data: []
        }
        result.push(item);
        return this.createTree(data, result, _nextHeading)
      } else {

        result[result.length - 1].data.push({
          dom: _nextHeading
        })
        return this.createTree(data, result, _thisHeading)

      }
    } else {

      return result;
    }
  }

  renderNavList() {
    return (
      <Anchor className="nav-anchor"
              offsetTop={80}>
        {
          this.state.navList.map((rowItem) => {
            return (
              <Anchor.Link key={rowItem.dom.id} href={`#${rowItem.dom.id}`} >
                <Link onClick={(e) => this.handelLinkClick(rowItem.dom.id, e)}> {rowItem.dom.innerText} </Link>
                {
                  !!rowItem.data && rowItem.data.map((colItem) => {
                    return (
                      <Anchor.Link key={colItem.dom.id} href={`#${colItem.dom.id}`} >
                        <Link onClick={(e) => this.handelLinkClick(colItem.dom.id, e)}> {colItem.dom.innerText} </Link>
                      </Anchor.Link>
                    )
                  })
                }
              </Anchor.Link>
            )
          })
        }
      </Anchor>
    )
  }

  render() {

    const { className, isAnchorList, page} = this.props;

    if (!isAnchorList || !page) {
      return null;
    }

    return (
      <div className={classnames('slideBlock', className, this.state.fixed ? 'fixed' : '')}>
        {this.state.navList.length > 0 ?
          this.renderNavList() :
          '暂无概览'}
      </div>
    )
  }
}
