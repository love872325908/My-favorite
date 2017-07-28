import React, {Component} from 'react';
import {Route, Link} from 'dva/router';
import styles from './Home.less';
import classNames from 'classnames';
import ReactSwipe from 'react-swipes';
import Buy from './Buy'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
  }

  onCloseBtn() {
    history.go(-1)
  }

  render() {
    const {location} = this.props;
    let opt = {
      distance: 16, // 每次移动的距离，卡片的真实宽度
      currentPoint: 0,// 初始位置，默认从0即第一个元素开始
      swTouchend: (ev) => {
        let data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
      }
    }
    let Y;
    switch (this.state.index) {
      case 0:
        Y = 0;
        break;
      case 1:
        Y = 1.85;
        break;
    }
    ;
    // switch (location.pathname) {
    //   case '/voluteercar/introduction':
    //     Y = 0;
    //     break;
    //   case '/voluteercar/evaluate':
    //     Y = 1.85;
    //     break;
    //   default:
    //     Y = 0;
    //     break;
    // }
    return (
      <div className={styles.vtCarBox}>
        <div className={styles.banner}>
          <svg className={classNames('icon', styles.closeLog)} aria-hidden="true" onClick={this.onCloseBtn.bind(this)}>
            <use xlinkHref="#icon-cuowu1"></use>
          </svg>
          <div className={styles.titleBox}>
            <div className={styles.title}>
              <h3>志愿卡通</h3>
              <span>MEMBERSHIP CARD</span>
            </div>
          </div>
          <div className={styles.menryBox}>
            <span className={styles.money}><span className={styles.moneyLogo}>￥</span>&nbsp;98.00</span>
          </div>
        </div>
        <div className={styles.VcatMainBox}>
          <ul className={classNames(styles.xuanze, "clearfix")}>
            <ReactSwipe className={classNames(styles.xuanze, "clearfix")} options={opt}>
              <li onClick={() => {
                this.setState({index: 0})
              }}><Link activeClassName={styles.active} to='/volunteercar/introduction'>产品介绍</Link></li>
              <li onClick={() => {
                this.setState({index: 1})
              }}><Link activeClassName={styles.active} to='/volunteercar/evaluate'>用户评价</Link></li>
              <span style={{transform: `translateX(${Y}rem)`}}></span>
            </ReactSwipe>
          </ul>
          {this.props.children}
        </div>
        <Buy {...this.props}/>
      </div>
    )
  }
}
