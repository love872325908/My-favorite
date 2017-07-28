import React, { Component } from 'react';
import styles from './Btn.less';
import { Route, Link } from 'dva/router';
import classNames from 'classnames';
export default class Btn extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Contrast } = this.props.getRegion;
    let length;
    if(Contrast){
    if(Contrast.length == 0){
      length = '';
    }else{
      length = Contrast.length;
    }}
    return (
      <Link className={styles.popup} to='/compete'>
        <div className={styles.bgr} style={{display:length? 'block':'none'}}>
          <span>{length}</span>
        </div>
      </Link>
    )
  }
}

