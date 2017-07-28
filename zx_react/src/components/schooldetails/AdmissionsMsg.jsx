import React, { Component } from 'react'
import styles from './Home.less'
import classNames from 'classnames'

import InfoContent from './sdcommen/InfoContent'

export default class extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className={classNames('clearfix', styles.schoolBox)}>
        <InfoContent {...this.props}></InfoContent>
      </div>
    )
  }
}
