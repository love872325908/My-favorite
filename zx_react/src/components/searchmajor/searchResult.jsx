import React, {Component} from 'react'
import {Link} from 'dva/router';
import styles from './Home.less'
import classNames from 'classnames'
import Navbar from '../common/Navbar'
import ReactSwipe from 'react-swipes';
import {GetRequest} from '../../services/service'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      show: false,
    }
    this.onLinkSchoolList = this.onLinkSchoolList.bind(this)
    this.onLinkMajorInfo = this.onLinkMajorInfo.bind(this)
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'home/targetUrl', payload: '/searchmajor'
    })
  }

  onLinkSchoolList(specialname) {
    const {history} = this.props;
    let argument = GetRequest();
    history.push(`/searchResult/openmajorschool?&specialname=${specialname}`)
  }

  onLinkMajorInfo(specialname) {
    const {history} = this.props;
    let argument = GetRequest();
    history.push(`/searchResult/majormsg?&specialname=${specialname}`)
  }

  ifShow(item) {
    this.setState({
      show: !this.state.show
    })
    const {dispatch} = this.props;
    dispatch({
      type: 'searchmajor/saveMajorInfo',
      payload: {
        Info: item
      }
    })
  }

  render() {
    const {location, route, searchmajor, dispatch,history} = this.props;
    const {searchResult} = this.props.searchmajor;
    let argument = GetRequest();
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
    switch (location.pathname) {
      case '/searchResult/majormsg':
        Y = 0;
        break;
      case '/searchResult/openmajorschool':
        Y = 1.85;
        break;
    }

    let listItem, majorList;
    if (searchResult) {
      if (searchResult.searchResult && searchResult.searchResult.data.S == '1') {
        majorList = searchResult.searchResult.data.pList.map((item, index) => {
          return <ul key={index}>
            <li onClick={() => {
              this.onLinkMajorInfo(item.specialname), this.ifShow(item), dispatch({
                type: 'home/targetUrl', payload: '/searchResult'
              })
            }}>{item.zytype}: {item.specialname}</li>
          </ul>
        })
        listItem = searchResult.searchResult.data.pList.map((item, index) => {
          return <div key={index}>
            <div className={styles.searchRu}>
              <Navbar {...this.props} title='搜索结果' back="searchmajor"></Navbar>
              {index == 0 ? majorList : ''}
            </div>
          </div>
        })
      } else {
        listItem =
          <div>
            <div className={styles.searchRu}>
              <Navbar {...this.props} title='搜索结果' back="searchmajor"></Navbar>
              <div style={{border: 'none', paddingTop: '.1rem', marginTop: '50%'}}>
                <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
                  <use xlinkHref="#icon-zanwuneirong-"></use>
                </svg>
                <strong>请更换查询条件</strong></div>
            </div>
          </div>
      }
    }
    if(searchResult == undefined && searchmajor.Info == undefined){
      history.push(`/searchmajor`)
    }
    return (
      <div>
        <div
          style={{display: location.pathname === '/searchResult/openmajorschool' || location.pathname === '/searchResult/majormsg' ? 'block' : 'none'}}>
          <Navbar {...this.props} title={searchmajor.Info ? searchmajor.Info.Info.specialname : '' } goback></Navbar>
          <div className={styles.VcatMainBox}>
            <ul className={classNames(styles.xuanze, "clearfix")}>
              <ReactSwipe className={classNames(styles.xuanze, "clearfix")} options={opt}>
                <li className={styles.active} onClick={() => {
                  this.setState({index: 0}), this.onLinkMajorInfo(argument.specialname)
                }}>专业详情
                </li>
                <li className={styles.active} onClick={() => {
                  this.setState({index: 1}), this.onLinkSchoolList(argument.specialname)
                }}>开设院校
                </li>
                <span style={{transform: `translateX(${Y}rem)`}}></span>
              </ReactSwipe>
            </ul>
          </div>
          {this.props.children}
        </div>
        <div
          style={{display: location.pathname === '/searchResult' ? 'block' : 'none'}}>
          {listItem}
        </div>
      </div>
    )
  }
}
