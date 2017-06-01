import React, { Component, PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers';
import { Link } from 'react-router';
import { Layout } from 'antd';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';

import './footer.scss';

const { Footer } = Layout;

export default function componentFooter(props) {
  return (
    <Footer className="footerWrap">
      <div className="footerMsg">
        © 2017 create by zhangbx
      </div>
    </Footer>
  )
}
