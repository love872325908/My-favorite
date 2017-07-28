import React, { Component } from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import Select from '../common/Select';

import SetGradeLine from './sdcommen/SetGradeLine'

export default class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={classNames(styles.cutoffScoreBox)}>
        <SetGradeLine {...this.props}></SetGradeLine>
        <Select {...this.props}/>
      </div>
    )
  }
}
