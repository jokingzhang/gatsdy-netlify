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

    const { location, children, route} = this.props;
    const onlyContentPaths = ['/about/', '/archive/', '/404.html'];

    this.state = {};
    this.state.sidebar = ''

    if (location.pathname == '/') {
      this.state.sidebar = 'normal';
    } else if(onlyContentPaths.indexOf(location.pathname) >= 0) {
      this.state.sidebar = 'hide';
    } else {
      this.state.sidebar = 'article';
    }

    // console.info("constructor::this.props.location", this.props, this.state);
  }

  componentDidMount() {
    // console.info('componentDidMount called');
  }

  componentWillUnmount() {
    // console.info('componentWillUnmount called');
  }

  componentWillUpdate(nextProps) {
    console.info('nextProps:', nextProps);
    let path = nextProps.location.pathname;
    if(path != this.props.location.pathname) {
    // console.info('componentWillUpdate called', path, this.props.location.pathname);
      this.setIsSidebar(path);
    }
  }

  componentDidUpdate() {
    // console.info('componentDidUpdate called');
  }

  componentWillReceiveProps(nextProps) {
    // console.info('componentWillReceiveProps called', nextProps, this.props);
  }

  setIsSidebar (path) {
    console.info('setIsSidebar called', path);
    let onlyContentPaths = ['/about/', '/archive/', '/404.html'];
    if (onlyContentPaths.indexOf(path) >= 0) {
      this.setState({
        sidebar: 'hide'
      })
    } else if(path == '/') {
      this.setState({
        sidebar: 'normal'
      })
    } else {
      this.setState({
        sidebar: 'article'
      })
    }
  }

  render () {

    const { location, children, route} = this.props;

    const headerData = [{
      title: '首页',
      path: '/'
    },{
      title: '关于',
      path: '/about/'
    },{
      title: '归档',
      path: '/archive/'
    }];

    console.info('render called', this.props, this.state);

    let page = route.pages.filter(page => {
      if (page.path == location.pathname) {
        return true;
      } else {
        return false;
      }
    })[0]

    return (
      <Container
        className="container">
        <Header data={config} list={headerData} pathName={this.props.location.pathname} />
        <Layout className="blog-container c-layout">

          <Sidebar className={classnames('c-sidebar-right', this.state.sidebar)} type={this.state.sidebar} data={config} page={page} pages={this.props.route.pages} />
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
