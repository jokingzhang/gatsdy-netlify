import React from 'react'
import moment from 'moment'
import $ from 'jquery';
import { Link } from 'react-router';
import Helmet from "react-helmet"
import ReadNext from '../components/ReadNext'
import { config } from 'config'

import '../scss/zenburn.scss'
import '../scss/container.scss'

class MarkdownWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    var _node = $(this.props.route.page.data.body);
    var _arr = _node.filter(":header");
    //这里暂时只支持一级标题
    //有一个标题列表，按层级1~6来嵌套

    var _headingObj = {
      H1: "",
      H2: "",
      H3: "",
      H4: "",
      H5: "",
      H6: ""
    }
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
      // console.info("_nextHeading[0].id===>", _nextHeading[0].id)
      // console.info("_nextHeading[0].nodeName===>", _nextHeading[0].nodeName)
      // console.info("_nextHeading[0].innerText===>", _nextHeading[0].innerText)
      // console.info("--------------------------");
      _num++;
      if (_num > 10) {
        break;
      }

      if (_isFirst) {
        _headingObj[_nextHeading[0].nodeName] = _nextHeading[0].id;
        _tree = _nextHeading[0];
        _isFirst = false;
        _lastNodeName = _tree.nodeName;
      } else {
        // console.info(_nodeList[_nodeList.length - 1]);
        debugger;
        if (_tree.nodeName >= _nextHeading[0].nodeName) {
          _treeList.push(_tree);
          _tree = _nextHeading[0];
          // _lastNodeName = _tree.nodeName;
        } else {
          var _tmpNode = _nextHeading[0];
          _tree = this.getTree(_tree, _tmpNode);
        }
      }
    }
    console.info("_treeList==>", _treeList);
  }

  getTree (parentNode, childNode) {
    if (!parentNode.treeNodes) {
      parentNode.treeNodes = [childNode];
      return parentNode;
    } else if(parentNode.treeNodes && parentNode.treeNodes.length > 0) {
      if (parentNode.treeNodes[parentNode.treeNodes.length - 1].nodeName >= childNode.nodeName) {
        this.getTree(parentNode.treeNodes[parentNode.treeNodes.length - 1], childNode);
      } else {
        parentNode.treeNodes.push(childNode);
        return parentNode;
      }
    }
  }

  render () {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div className="markdown c-content">
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