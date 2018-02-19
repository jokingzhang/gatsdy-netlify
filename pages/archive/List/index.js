import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';


import './list.scss'

export default class List extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { className, data } = this.props;

    return (
      <div className={classnames(className, 'listWrap')}>
        {
          !!data && data.length > 0 && data.map((ca, i) => {
            return (
              <Link className="article" to={prefixLink(ca.data.path)} key={i}>
                  <span className="circle"></span>
                  <span className="date">{moment(ca.data.date).format('YYYY年MM月DD日')}</span>
                  <span className="title">{ca.data.title}</span>
              </Link>
            )
          })
        }
      </div>
    )
  }
}
