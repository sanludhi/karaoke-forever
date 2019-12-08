/* eslint-disable no-undef */
import React from 'react'
import Logo from 'components/Logo'
import './About.css'

export default class About extends React.Component {
  render () {
    return (
      <div styleName='container'>
        <h1 styleName='title'>About</h1>
        <div styleName='content'>
          <a href={__KF_HOMEPAGE__}>
            <Logo styleName='logo'/>
          </a>
          <p styleName='sm'>
            v{__KF_VERSION__}<br/>&copy;{__KF_COPYRIGHT__}
          </p>
          <p><a href='/license_en.txt' target='blank'>Open Source Licenses</a></p>
        </div>
      </div>
    )
  }
}