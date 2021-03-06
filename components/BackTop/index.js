import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'
import { Link } from 'react-router'
import uniq from 'lodash/uniq';
import classnames from 'classnames';
import './backtop.scss';

export default class BackTop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll () {
    const windowGlobal = typeof window !== 'undefined' && window;
    let _top = windowGlobal.document.getElementById("container").scrollTop;
    // console.info("handleScroll", _top);
    if (_top >= 100) {
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: false
      })
    }
  }

  onBackTopClick() {
    const windowGlobal = typeof window !== 'undefined' && window;
    windowGlobal.document.getElementById("container").scrollTop = 0;
  }

  componentDidMount() {
    const windowGlobal = typeof window !== 'undefined' && window;
    windowGlobal.document.getElementById("container").addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const windowGlobal = typeof window !== 'undefined' && window;
    windowGlobal.document.getElementById("container").removeEventListener('scroll', this.handleScroll);
  }

  render() {

    const { className } = this.props;

    return (
      <div onClick={this.onBackTopClick} className={classnames('backTop', this.state.show ? 'show' : '')}>
        <i className="icon iconfont icon-backtop"></i>
      </div>
    )
  }
}
