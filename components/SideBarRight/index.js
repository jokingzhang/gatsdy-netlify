import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import classnames from 'classnames';
import { config } from 'config';
import SidebarRecommend from './Recommend';
import SidebarLabel from './Label';
import SidebarTab from './Tab';
import SidebarAnchor from './AnchorList';

import './sidebar.scss';

class Sidebar extends Component {

  constructor(props) {
    // 服务端渲染不支持ID，就此作罢，现发布

    super(props);

    this.state = {
      isAnchorList: false
    };

    // if (this.props.type != 'article') {
    //   this.state.isAnchorList = false;
    // }

    this.handelTabClick = this.handelTabClick.bind(this);
  }

  handelTabClick(value) {
    this.setState({
      isAnchorList: value
    })
    console.info("handelTabClick==>", this.state);
  }

  componentWillReceiveProps(nextProps) {
    // let type = nextProps.type;
    // console.info('Sidebar::::componentWillUpdate', this.props);
    // if (type != this.props.type) {
    //   if (type != 'article') {
    //     this.setState({
    //       isAnchorList: false
    //     });
    //   } else {
    //     this.setState({
    //       isAnchorList: true
    //     });
    //   }
    // }
  }

  render() {
    const { className, data, pages, page } = this.props;

    let sidebarType = data.type;
    // let isNotFound = this.props.type != 'article' || (this.props.type == 'article' && !this.props.page);
    let isNotFound = true;
    return (
      <div className={classnames(className, 'siderBarRight')}>
        <SidebarTab className={isNotFound ? 'hide' : ''} onTabClick={this.handelTabClick} isAnchorList={this.state.isAnchorList} />
        <SidebarRecommend className={this.state.isAnchorList ? 'hide' : ''} data={data} pages={pages} />
        <SidebarLabel className={this.state.isAnchorList ? 'hide' : ''} data={data} pages={pages} />
        <SidebarAnchor className={this.state.isAnchorList ? '' : 'hide'} page={page} isAnchorList={this.state.isAnchorList} />
      </div>
    )
  }
}

export default Sidebar;
