import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Breadcrumb, Layout } from 'antd';
import { Container } from 'react-responsive-grid';
import { prefixLink } from 'gatsby-helpers';
import { config } from 'config';
import Header from '../components/Header';
import BackTop from '../components/BackTop';
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

    this.state.page = route.pages.filter(page => {
      if (page.path == location.pathname) {
        return true;
      } else {
        return false;
      }
    })[0]

    console.info("constructor::this.props.location", this.props, this.state);
  }

  componentDidMount() {
    // console.info('componentDidMount called');
  }

  componentWillUnmount() {
    // console.info('componentWillUnmount called');
  }

  componentWillUpdate(nextProps) {
    console.info('nextProps:', nextProps, this.props);
    let path = nextProps.location.pathname;
    if(path != this.props.location.pathname) {
      console.info('template::componentWillUpdate called', path, this.props.location.pathname);
      window.document.getElementById("container").scrollTop = 0;
      this.setIsSidebar(path);
      this.setPage(path);
    }
  }

  componentDidUpdate() {
    // console.info('componentDidUpdate called');
  }

  componentWillReceiveProps(nextProps) {
    // console.info('componentWillReceiveProps called', nextProps, this.props);
  }

  setPage (path) {
    let _page = this.props.route.pages.filter(page => {
      if (page.path == path) {
        return true;
      } else {
        return false;
      }
    })[0]
    this.setState({
      page: _page
    })
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



    return (
      <Container
        className="container"
        id="container"
        ref="container">
        <Header data={config} type={this.state.sidebar} page={this.state.page} list={headerData} pathName={this.props.location.pathname} />
        <Layout className="blog-container c-layout">

          <Sidebar className={classnames('c-sidebar-right', this.state.sidebar)} type={this.state.sidebar} data={config} page={this.state.page} pages={this.props.route.pages} />
          {this.props.children}
        </Layout>
        <BackTop />
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
