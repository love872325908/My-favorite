import React, {Component} from 'react';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';
import styles from './compete.less';
import List from './List';

export default class City extends Component{
 constructor(props) {
    super(props);
    }
    render(){
      const { history,match } =this.props;

      return(
    <div >

      <div className={styles.box}>
        <div className={styles.navbar} onClick={()=>history.push('/compete')}>&times;</div>
        地区
      </div>
        <List {...this.props}/>

    </div>
      )
    }
  }

