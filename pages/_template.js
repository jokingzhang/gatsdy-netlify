import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, scale } from 'utils/typography'
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
        className="blog-container"
        style={{
          maxWidth: rhythm(40),
          padding: `${rhythm(1.5)} ${rhythm(3/4)}`,
        }}
      >
        <Header data={config} />
        <Sidebar data={config} pages={route.pages} />
        {children}
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
