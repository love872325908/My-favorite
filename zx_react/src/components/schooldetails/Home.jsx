import React, {Component} from 'react';
import {Route, Link} from 'dva/router';
import styles from './Home.less';
import classNames from 'classnames';
import Navbar from '../common/Navbar';
import {GetRequest} from '../../services/service'
import ReactSwipe from 'react-swipes'

/**
 * SchoolMsg => 学校概况
 * CutoffScore => 专业分数线
 * HistoreScore => 历史分数线
 * AdmissionsMsg => 招生信息
 * Guide => 报考指南
 * SchoolImg => 院校全景
 */
export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0}
    this.onChangeClued = this.onChangeClued.bind(this)
  }

  componentDidMount() {
    const {dispatch, schooldetails} = this.props;
    let argument = GetRequest();
    dispatch({
      type: 'schooldetails/saveSchoolId',
      payload: {
        ID: argument.ID
      }
    })
    dispatch({
      type: 'schooldetails/getIntroduce',
      payload: {
        ID: argument.ID,
        CategoryID: 1
      }
    })
    dispatch({
      type: 'voluteercar/getMajorList', payload: {
        SchoolID: argument.ID,
      }
    })
  }

  onChangeClued(cid) {
    const {dispatch, schooldetails} = this.props;
    let argument = GetRequest();
    dispatch({
      type: 'schooldetails/getIntroduce',
      payload: {
        ID: parseInt(schooldetails.SchoolId.ID ? schooldetails.SchoolId.ID : arguments.ID),
        CategoryID: cid
      }
    })
  }

  render() {
    const {location, schooldetails, voluteercar} = this.props;
    console.log(schooldetails)
    let schoolName;
    if (schooldetails.QSInfo.QSInfo && schooldetails.QSInfo.QSInfo.data != undefined) {
      schoolName = schooldetails.QSInfo.QSInfo.data.SchoolList[0].schoolname
    }
    let opt = {
      distance: 22, // 每次移动的距离，卡片的真实宽度
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
        Y = 1;
        break;
      case 2:
        Y = 2;
        break;
      case 3:
        Y = 3;
        break;
      case 4:
        Y = 4;
        break;
      case 5:
        Y = 5;
        break;
    }
    ;
    switch (location.pathname) {
      case '/schooldetails/schoolmsg':
        Y = 0;
        break;
      case '/schooldetails/schoolmajor':
        Y = 1;
        break;
      case '/schooldetails/cutoffscore':
        Y = 2;
        break;
      case '/schooldetails/historescore':
        Y = 3;
        break;
      case '/schooldetails/admissionsmsg':
        Y = 4;
        break;
      case '/schooldetails/guide':
        Y = 5;
        break;
      case '/schooldetails/schoolimg':
        Y = 6;
        break;
    }
    let argument = GetRequest();
    return (
      <div className={classNames(styles.faterBox)}>
        <Navbar title={schoolName} {...this.props} goback/>
        <div className={classNames(styles.wrap, styles.marg)}>
          <ul className={classNames(styles.xuanze, "clearfix")}>
            <ReactSwipe className={classNames(styles.xuanze, "clearfix")} options={opt}>
              <li onClick={() => {
                this.setState({index: 0});
                this.onChangeClued(1)
              }}><Link activeClassName={styles.active} to={`/schooldetails/schoolindex?&ID=${argument.ID}`}>学校概况</Link>
              </li>
              <li onClick={() => {
                this.setState({index: 1})
              }}><Link activeClassName={styles.active} to={`/schooldetails/schoolmajor?&ID=${argument.ID}`}>招生专业</Link>
              </li>
              <li onClick={() => {
                this.setState({index: 2})
              }}><Link activeClassName={styles.active} to={`/schooldetails/cutoffscore?&ID=${argument.ID}`}>专业分数线</Link>
              </li>
              <li onClick={() => {
                this.setState({index: 3})
              }}><Link activeClassName={styles.active}
                       to={`/schooldetails/historescore?&ID=${argument.ID}`}>历史分数线</Link></li>
              <li onClick={() => {
                this.setState({index: 4});
                this.onChangeClued(2)
              }}><Link activeClassName={styles.active}
                       to={`/schooldetails/admissionsmsg?&ID=${argument.ID}`}>招生信息</Link></li>
              <li onClick={() => {
                this.setState({index: 5});
                this.onChangeClued(3)
              }}><Link activeClassName={styles.active} to={`/schooldetails/guide?&ID=${argument.ID}`}>报考指南</Link></li>
              {/*<li onClick={() => {*/}
              {/*this.setState({index: 6})*/}
              {/*}}><Link activeClassName={styles.active} to='/schooldetails/schoolimg'>院校全景</Link></li>*/}
              <span style={{transform: `translateX(${Y * .84}rem)`}}></span>
            </ReactSwipe>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
}
