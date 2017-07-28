import React, { Component } from 'react';
import { Route, Link } from 'dva/router';
import styles from './Login.less';
import classNames from 'classnames';
import Navbar from '../common/Navbar';
import Toast from '../common/Toast';
export default class Login extends Component {

  constructor(props) {
    super(props);
     }
    render(){

    return(
    <div >
      <Navbar title='登录' {...this.props}  home='home/select' />
      <div className={styles.main}>
        <div className={styles.fenge}></div>
        <div className={styles.body}>
          <input type='text' placeholder='请输入用户名' autoFocus/>
          <input type='password' placeholder='请输入密码' />
          <button>登录</button>
        </div>
      </div>
    </div>
    )
    }

}
