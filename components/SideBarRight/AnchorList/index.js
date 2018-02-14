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
    this.state = {};

    var _node = $(this.props.page.data.body);
    var _arr = _node.filter(":header");
    //这里暂时只支持一级标题
    //有一个标题列表，按层级1~6来嵌套
    // debugger;
    // var _headingObj = {
    //   H1: "",
    //   H2: "",
    //   H3: "",
    //   H4: "",
    //   H5: "",
    //   H6: ""
    // }
    var _tree = {};
    var _num = 0;
    var _isFirst = true;
    var _lastNodeName = "";
    var _treeList = [];
    var _nodeList = [];
    // _nodeList.push(<Link href={`#${_tree.id}`} title={_tree.innerText}> </Link>);
    console.info("_arr==>", _arr);
    while(_arr.length > 0) {
      var _nextHeading = _arr.splice(0, 1);
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
          var _tmpNode = $(_nextHeading).clone();
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
    console.info("_treeList==>", _treeList);
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
  }

  createNode (data) {

    if (data.treeNodes) {
      return (
        <Anchor.Link href={`#${data[0].id}`} title={data[0].innerText}>{this.createTree(data)}</Anchor.Link>
      )
    } else {
      return <Anchor.Link href={`#${data[0].id}`} title={data[0].innerText} />
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
    var l1ParentNode = parentNode;
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
    var l2ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
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
    var l3ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    var l2ParentNode = l3ParentNode.treeNodes[l3ParentNode.treeNodes.length - 1];
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
    var l4ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    var l3ParentNode = l4ParentNode.treeNodes[l4ParentNode.treeNodes.length - 1];
    var l2ParentNode = l3ParentNode.treeNodes[l3ParentNode.treeNodes.length - 1];
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
    var l5ParentNode = parentNode.treeNodes[parentNode.treeNodes.length - 1];
    var l4ParentNode = l5ParentNode.treeNodes[l5ParentNode.treeNodes.length - 1];
    var l3ParentNode = l4ParentNode.treeNodes[l4ParentNode.treeNodes.length - 1];
    var l2ParentNode = l3ParentNode.treeNodes[l3ParentNode.treeNodes.length - 1];
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
      <Anchor className="nav-anchor">
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

    const { className } = this.props;

    return (
      <div className={classnames('slideBlock', className)}>
        {this.state.navList.length > 0 ?
          this.renderNavList() :
          '暂无概览'}
      </div>
    )
  }
}
