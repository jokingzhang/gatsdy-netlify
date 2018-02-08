import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import classnames from 'classnames';
import { Link } from 'react-router';
import uniq from 'lodash/uniq';


import './tags.scss'

export default class Label extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { className,data } = this.props;

    return (
      <div className={classnames(className, 'tagsWrap')}>
        {data.map((ca, i) => (
          <Link className={classnames('tag', ca.active ? 'active' : '')} to={prefixLink(`/archive/?t=${ca.tag}`)} key={i}>
              {ca.title}
          </Link>
        ))}
      </div>
    )
  }
}
