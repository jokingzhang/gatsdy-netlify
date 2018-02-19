import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import { Anchor } from 'antd';
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

    // debugger;
    this.state.navList = [];
    console.info('Anchor', this.props, this.state)

    this.handleScroll = this.handleScroll.bind(this);
    this.handelLinkClick = this.handelLinkClick.bind(this);
  }

  componentDidMount() {

    const windowGlobal = typeof window !== 'undefined' && window;

    // console.info('componentDidMount：this.props.page.data.body==>', _dom);

    let _array = []
    if (this.props.page.data.body) {
      _array = this.props.page.data.body.match(/<h\d((\w|\s|=|-|\/|\"|<|>|\(|\)|[\u4e00-\u9fa5])+)<\/h\d>/ig);
    }
    let _domArray = []

    _array.forEach((_hItem) => {
      let _id = _hItem.match(/id=\"((\w|-)+)/)[1];
      _domArray.push(windowGlobal.document.getElementById(_id));
    })

    console.info("_domArray==>", _domArray);
    let _nodeList = this.createTree(_domArray);

    this.setState({
      navList: _nodeList || []
    })

    if (this.props.isAnchorList) {
      windowGlobal.document.getElementById("container").addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    const windowGlobal = typeof window !== 'undefined' && window;
    if (this.props.isAnchorList) {
      windowGlobal.document.getElementById("container").removeEventListener('scroll', this.handleScroll);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const windowGlobal = typeof window !== 'undefined' && window;
    let path = prevProps.page.path;
    console.info('AnchorList::::componentWillReceiveProps', prevProps, this.props);
    if (path != this.props.page.path) {

      windowGlobal.document.getElementById("container").addEventListener('scroll', this.handleScroll);

      let _array = []
      if (this.props.page.data.body) {
        _array = this.props.page.data.body.match(/<h\d((\w|\s|=|-|\/|\"|<|>|\(|\)|[\u4e00-\u9fa5])+)<\/h\d>/ig);
      }
      let _domArray = []

      _array.forEach((_hItem) => {
        let _id = _hItem.match(/id=\"((\w|-)+)/)[1];
        _domArray.push(windowGlobal.document.getElementById(_id));
      })

      let _nodeList = this.createTree(_domArray);

      this.setState({
        fixed : false,
        navList : _nodeList || []
      })
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  handleScroll () {
    const windowGlobal = typeof window !== 'undefined' && window;

    let _top = windowGlobal.document.getElementById("container").scrollTop;
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
    const windowGlobal = typeof window !== 'undefined' && window;
    let targetElement = windowGlobal.document.getElementById(href);
    if (!targetElement) {
        return;
    }
    let eleOffsetTop = targetElement.offsetTop;
    console.info("_scrollTo==>", eleOffsetTop);
    windowGlobal.document.getElementById("container").scrollTo({top: eleOffsetTop})
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
          this.state.navList.length > 0 && this.state.navList.map((rowItem) => {
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
