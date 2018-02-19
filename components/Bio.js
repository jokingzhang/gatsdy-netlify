import React, { Component, PropTypes } from 'react';
import { config } from 'config'
import profilePic from '../images/profile.png'

export default class Bio extends Component {
  render () {
    return (
      <p>
        <img
          src={profilePic}
          alt={`author ${config.authorName}`}
        />
        Written by <strong>{config.authorName}</strong> who lives and works in San Francisco building useful things. <a href="https://twitter.com/kylemathews">You should follow him on Twitter</a>
      </p>
    )
  }
}
