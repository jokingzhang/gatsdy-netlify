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
    //这里暂时只支持一级标题
    //有一个标题列表，按层级1~6来嵌套
    // debugger;
    // let _headingObj = {
    //   H1: "",
    //   H2: "",
    //   H3: "",
    //   H4: "",
    //   H5: "",
    //   H6: ""
    // }
    let _tree = {};
    let _num = 0;
    let _isFirst = true;
    let _lastNodeName = "";
    let _treeList = [];
    let _nodeList = [];
    // _nodeList.push(<Link href={`#${_tree.id}`} title={_tree.innerText}> </Link>);
    console.info("_arr==>", _arr);
    while(_arr.length > 0) {
      let _nextHeading = _arr.splice(0, 1);
      console.info("_nextHeading[0].id===>", _nextHeading[0].id)
      console.info("_nextHeading[0].nodeName===>", _nextHeading[0].nodeName)
      console.info("_nextHeading[0].innerText===>", _nextHeading[0].innerText)
      // console.info("--------------------------");
      // _num++;
      // if (_num > 10) {
      //   break;
      // }

      if (_isFirst) {
        // _headingObj[_nextHeading[0].nodeName] = _nextHeading[0].id;
        _tree = $(_nextHeading).clone();
        _isFirst = false;
        _lastNodeName = _tree[0].nodeName;
      } else {
        // debugger;
        console.info(_nodeList[_nodeList.length - 1]);
        if (_tree[0].nodeName <= _nextHeading[0].nodeName) {

          _treeList.push(_tree);
          _tree = _nextHeading;
          // _lastNodeName = _tree[0].nodeName;
        } else {

          // debugger;
          let _tmpNode = $(_nextHeading).clone();
          this.isPush = false;
          if(!this.isPush) {
            _tree = this.getTree1(_tree, _tmpNode);
          }
          if(!this.isPush) {
            _tree = this.getTree2(_tree, _tmpNode);
          }
          if(!this.isPush) {
            _tree = this.getTree3(_tree, _tmpNode);
          }
          if(!this.isPush) {
            _tree = this.getTree4(_tree, _tmpNode);
          }
          if(!this.isPush) {
            _tree = this.getTree5(_tree, _tmpNode);
          }

        }
      }
    }

    if (_tree && _tree[0] && _tree[0].id != _treeList[_treeList.length - 1][0].id) {
      _treeList.push(_tree);
    }

    _treeList.map((data) => {
      if (data.treeNodes) {
        _nodeList.push(this.createTree(data));
      } else {
        _nodeList.push(this.createNode(data));
      }
    })

    console.info(_nodeList);
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

  componentWillUpdate(nextProps) {

    let path = nextProps.page.path;
    console.info('AnchorList::::componentWillUpdate', nextProps, this.props);
    if (path != this.props.page.path) {
      setTimeout(() => {

        let _node = $(this.props.page.data.body);
        let _arr = _node.filter(":header");
        let _tree = {};
        let _num = 0;
        let _isFirst = true;
        let _lastNodeName = "";
        let _treeList = [];
        let _nodeList = [];
        // _nodeList.push(<Link href={`#${_tree.id}`} title={_tree.innerText}> </Link>);
        console.info("_arr==>", _arr);
        while(_arr.length > 0) {
          let _nextHeading = _arr.splice(0, 1);

          if (_isFirst) {
            // _headingObj[_nextHeading[0].nodeName] = _nextHeading[0].id;
            _tree = $(_nextHeading).clone();
            _isFirst = false;
            _lastNodeName = _tree[0].nodeName;
          } else {
            // debugger;
            console.info(_nodeList[_nodeList.length - 1]);
            if (_tree[0].nodeName <= _nextHeading[0].nodeName) {

              _treeList.push(_tree);
              _tree = _nextHeading;
              // _lastNodeName = _tree[0].nodeName;
            } else {

              // debugger;
              let _tmpNode = $(_nextHeading).clone();
              this.isPush = false;
              if(!this.isPush) {
                _tree = this.getTree1(_tree, _tmpNode);
              }
              if(!this.isPush) {
                _tree = this.getTree2(_tree, _tmpNode);
              }
              if(!this.isPush) {
                _tree = this.getTree3(_tree, _tmpNode);
              }
              if(!this.isPush) {
                _tree = this.getTree4(_tree, _tmpNode);
              }
              if(!this.isPush) {
                _tree = this.getTree5(_tree, _tmpNode);
              }

            }
          }
        }

        if (_tree && _tree[0] && _tree[0].id != _treeList[_treeList.length - 1][0].id) {
          _treeList.push(_tree);
        }

        _treeList.map((data) => {
          if (data.treeNodes) {
            _nodeList.push(this.createTree(data));
          } else {
            _nodeList.push(this.createNode(data));
          }
        })

        console.info(_nodeList);

        this.setState({
          fixed : false,
          navList : _nodeList || []
        })

      }, 10);
    }
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

  createNode (data) {

    if (data.treeNodes) {
      return (
        <Anchor.Link key={data[0].id} href={`#${data[0].id}`} title={data[0].innerText}>{this.createTree(data)}</Anchor.Link>
      )
    } else {
      return <Anchor.Link key={data[0].id} href={`#${data[0].id}`} ><Link onClick={(e) => this.handelLinkClick(data[0].id, e)}> {data[0].innerText} </Link> </Anchor.Link>
    }
  }

  createTree (data) {
    // debugger;
    console.info("createTree==>", data);
    return (
      data.treeNodes.map((node) => {
          return this.createNode(node);
      })
    )
  }

  getTree1 (parentNode, childNode) {
    let l1ParentNode = parentNode;
    if (!l1ParentNode.treeNodes) {
      l1ParentNode.treeNodes = [childNode];
      this.isPush = true;
    } else if(l1ParentNode.treeNodes && l1ParentNode.treeNodes.length > 0) {
      if (l1ParentNode.treeNodes[l1ParentNode.treeNodes.length - 1][0].nodeName >= childNode[0].nodeName) {
        l1ParentNode.treeNodes.push(childNode);
        this.isPush = true;
      }
    }
    return parentNode;
  }

  getTree2 (parentNode, childNode) {
    let l2ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    if (!l2ParentNode.treeNodes) {
      l2ParentNode.treeNodes = [childNode];
      this.isPush = true;
    } else if(l2ParentNode.treeNodes && l2ParentNode.treeNodes.length > 0) {
      if (l2ParentNode.treeNodes[l2ParentNode.treeNodes.length - 1][0].nodeName >= childNode[0].nodeName) {
        l2ParentNode.treeNodes.push(childNode);
        this.isPush = true;
      }
    }
    return parentNode;
  }

  getTree3 (parentNode, childNode) {
    let l3ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    let l2ParentNode = l3ParentNode.treeNodes[l3ParentNode.treeNodes.length - 1];
    if (!l2ParentNode.treeNodes) {
      l2ParentNode.treeNodes = [childNode];
      this.isPush = true;
    } else if(l2ParentNode.treeNodes && l2ParentNode.treeNodes.length > 0) {
      if (l2ParentNode.treeNodes[l2ParentNode.treeNodes.length - 1][0].nodeName >= childNode[0].nodeName) {
        l2ParentNode.treeNodes.push(childNode);
        this.isPush = true;
      }
    }
    return parentNode;
  }

  getTree4 (parentNode, childNode) {
    let l4ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    let l3ParentNode = l4ParentNode.treeNodes[l4ParentNode.treeNodes.length - 1];
    let l2ParentNode = l3ParentNode.treeNodes[l3ParentNode.treeNodes.length - 1];
    if (!l2ParentNode.treeNodes) {
      l2ParentNode.treeNodes = [childNode];
      this.isPush = true;
    } else if(l2ParentNode.treeNodes && l2ParentNode.treeNodes.length > 0) {
      if (l2ParentNode.treeNodes[l2ParentNode.treeNodes.length - 1][0].nodeName >= childNode[0].nodeName) {
        l2ParentNode.treeNodes.push(childNode);
        this.isPush = true;
      }
    }
    return parentNode;
  }

  getTree5 (parentNode, childNode) {
    let l5ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    let l4ParentNode = l5ParentNode.treeNodes[l5ParentNode.treeNodes.length - 1];
    let l3ParentNode = l4ParentNode.treeNodes[l4ParentNode.treeNodes.length - 1];
    let l2ParentNode = l3ParentNode.treeNodes[l3ParentNode.treeNodes.length - 1];
    if (!l2ParentNode.treeNodes) {
      l2ParentNode.treeNodes = [childNode];
      this.isPush = true;
    } else if(l2ParentNode.treeNodes && l2ParentNode.treeNodes.length > 0) {
      if (l2ParentNode.treeNodes[l2ParentNode.treeNodes.length - 1][0].nodeName >= childNode[0].nodeName) {
        l2ParentNode.treeNodes.push(childNode);
        this.isPush = true;
      }
    }
    return parentNode;
  }

  renderNavList() {
    return (
      <Anchor className="nav-anchor"
              offsetTop={80}>
        {
          this.state.navList.map((_nav) => {
            return (
              _nav
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
