import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Breadcrumb, Layout, BackTop } from 'antd';
import { Container } from 'react-responsive-grid';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/SideBarRight/';
import 'antd/lib/back-top/style';
import 'antd/lib/breadcrumb/style';
import '../scss/normalize.css';
import '../scss/container.scss';


class Template extends React.Component {

  constructor(props) {
    super(props);

    console.info("this.props.location", this.props);
  }

  renderBreadcrumb () {
    var _breadList = []

    if (this.props.location.pathname === "/") {
      _breadList.push(<Breadcrumb.Item>首页</Breadcrumb.Item>);
    } else if(this.props.location.pathname === "/about/") {
      _breadList.push(<Breadcrumb.Item>关于</Breadcrumb.Item>);
    } else if(this.props.location.pathname === "/archive/") {
      _breadList.push(<Breadcrumb.Item>归档</Breadcrumb.Item>);
    } else if(this.props.location.pathname === "/404.html"){

    } else {
      _breadList.push(
        <Breadcrumb.Item>
          <Link to={prefixLink("/")}>
            首页
          </Link>
        </Breadcrumb.Item>);
      _breadList.push(<Breadcrumb.Item>{this.props.routes[this.props.routes.length - 1].page.data.title}</Breadcrumb.Item>);
    }

    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        {
          _breadList.map((_path) => {
            return (
              _path
            )
          })
        }
      </Breadcrumb>
    )
  }

  render () {
    const { location, children, route} = this.props;
    return (
      <Container
        className="container">
        <Header data={config} pathName={this.props.location.pathname} />
        <Layout className="blog-container c-layout">
          <Sidebar className={classnames('c-sidebar-right')} data={config} pages={this.props.route.pages} />
          {/* <Sidebar className={classnames('c-sidebar')} data={config} pages={this.props.route.pages} /> */}
          {/* {this.renderBreadcrumb()} */}
          {this.props.children}
        </Layout>
        <BackTop className={classnames('c-back-top')} />
        <Footer />
      </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
