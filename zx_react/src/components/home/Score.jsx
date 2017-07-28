import React, { Component } from 'react';
import { Route, Link } from 'dva/router';
import styles from './Home.less';
import classNames from 'classnames';
import Navbar from '../common/Navbar';
import Btn from '../common/Btn';
import Select from '../common/Select';
import Toast from '../common/Toast';
import Load from '../common/Loading';
export default class Score extends Component {

  constructor(props) {
    super(props);
    this.state = { index: 1 }
    this.qiehuan = this.qiehuan.bind(this);
  }
  qiehuan(index){
    const{ dispatch ,score} = this.props;
    //  switch (index) {
    //   case 1:  dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc}}); break;
    //   case 2: console.log(2,score); break;
    //   case 3: console.log(3,score); break;
    // };

    dispatch({type:'home/targetUrl',payload:'/home/select'})
    console.log(this.props)
  }
  render() {
    const { location,dispatch ,score } = this.props;
    let Y;
    console.log(this.props)

    switch (location.pathname) {
      case '/score/school': Y = 0; break;
      case '/score/major': Y = 1.14; break;
      case '/score/batch': Y = 2.4; break;
    }

    return <div >
      <Navbar title='分数线' {...this.props}   goback />
      <Btn {...this.props}/>
      <Toast  {...this.props}/>
      <Load {...this.props}/>
      <div className={classNames(styles.wrap, styles.marg)}>
        <ul className={classNames(styles.xuanze, "clearfix")} >
          <li onClick={() => { this.qiehuan(1) }}><Link activeClassName={styles.active} to='/score/school'>高校分数线</Link></li>
          <li onClick={() => { this.qiehuan(2) }}><Link activeClassName={styles.active} to='/score/major'>专业分数线</Link></li>
          <li onClick={() => { this.qiehuan(3) }}><Link activeClassName={styles.active} to='/score/batch'>地区批次分数线</Link></li>
          <span style={{ transform: `translateX(${Y}rem)` }}></span>
        </ul>
        <Select {...this.props}/>

      </div>
{this.props.children}
    </div>
  }
}
