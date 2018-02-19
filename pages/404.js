import React, { Component, PropTypes } from 'react';
import '../scss/404.css';

export default class NotFound extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="me404">
        <div className="clouds"></div>
        <div className="the404"></div>
        <div className="monkey">
          <div className="monkey-eye-l"></div>
          <div className="monkey-eye-r"></div>
        </div>
        <div className="moon"></div>
        <div className="platform"></div>
        <div className="star1"></div>
        <div className="star2"></div>
        <div className="star3"></div>
        <div className="star4"></div>
        <div className="swirl"></div>
        <div className="sword">
          <div className="sword-shadow"></div>
        </div>
        <div className="tetris"></div>
        <div className="triforce"></div>
      </div>
    )
  }
}

exports.data = {
  title: "NOT FOUND PAGE",
  type: "only",
  hide: "hide"
}
