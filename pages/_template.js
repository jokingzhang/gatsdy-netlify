import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../scss/container.scss';


class Template extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { location, children, route} = this.props;
    return (
      <Container
        className="blog-container">
        <Header data={config} />
        <Sidebar data={config} pages={this.props.route.pages} />
        {this.props.children}
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
