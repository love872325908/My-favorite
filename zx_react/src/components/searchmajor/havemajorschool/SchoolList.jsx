import React, {Component} from 'react'
import styles from './Home.less'
import {Link} from 'dva/router';
import {GetRequest} from '../../../services/service'
import classNames from 'classnames'
import More from '../../common/More'

var arr = [];
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoIndex: 0,
      schoolInfo: false,
      page: 1,
    }
    this.onLoadMore = this.onLoadMore.bind(this)
    this.onBreak = this.onBreak.bind(this)
  }

  componentDidMount() {
    const {dispatch} = this.props;
    let argument = GetRequest();
    console.log(argument.specialname)
    dispatch({
      type: 'searchmajor/getOpenMajorSchool',
      payload: {
        page: this.state.page,
        specialname: argument.specialname
      }
    })
  }

  showInfo(index) {
    // this.setState({infoIndex: index, schoolInfo: !this.state.schoolInfo})
    this.setState({schoolInfo: false})
    const {dispatch} = this.props;
    dispatch({type: 'home/targetUrl', payload: '/searchmajor'})
    if (this.state.infoIndex == index) {
      this.setState({schoolInfo: !this.state.schoolInfo})
    } else {
      this.setState({infoIndex: index, schoolInfo: true})
    }
  }

  onLoadMore() {
    const {dispatch} = this.props;
    const {openMajorSchool} = this.props.searchmajor;
    this.setState({
      page: ++this.state.page,
    })
    let argument = GetRequest();
    dispatch({
      type: 'searchmajor/getOpenMajorSchool',
      payload: {
        page: this.state.page,
        specialname: argument.specialname
      }
    })
    if (this.state.page == openMajorSchool.openMajorSchool.data.PageCount) {
      alert('已经是最后一页了');
      return false;
    }
  }

  onBreak(id) {
    const {history, dispatch,location} = this.props;
    console.log(location,location.pathname+location.search)
    dispatch({type:'home/targetUrl',payload:location.pathname+location.search})
    history.push(`/schooldetails?&ID=${id}`)
  }

  render() {
    const {openMajorSchool} = this.props.searchmajor;
    console.log('---------openMajorSchool------------')
    console.log(openMajorSchool)
    let major, listItem, province, PageCount;
    if (openMajorSchool.openMajorSchool) {
      PageCount = openMajorSchool.openMajorSchool.data.PageCount;
    }
    if (openMajorSchool.openMajorSchool) {
      if (openMajorSchool.openMajorSchool.data.S == 1) {
        openMajorSchool.openMajorSchool.data.SchoolList.map((item) => {
          arr.push(item)
        })
        listItem = arr.quChong().map((item, index) => {
          return <li id={index} key={index} className='clearfix'>
            <div className={classNames(styles.titleName, 'clearfix')} onClick={() => {
              this.showInfo(index)
            }}>
              <div className={classNames(styles.msgImgBox)}>
                <img src={item.Logo ? item.Logo : require('../../../assets/images/none.png')}/>
              </div>
              <div className={classNames(styles.specialtyTypes)}>{item.schoolname}</div>
              <div
                className={classNames(styles.viewDetails)}>{this.state.schoolInfo && this.state.infoIndex == index ? '收起' : '查看详情'}</div>
            </div>
            <div className={classNames(styles.olYearScore)}
                 style={{display: this.state.schoolInfo && this.state.infoIndex == index ? 'block' : 'none'}}>
              <ul>
                <li>院校所在地:<span>&nbsp;{item.City}</span></li>
                <li>
                  院校性质: <span>{item.schoolnature}</span>
                </li>
                <li>
                  院校代码：<span>{item.schoolcode}</span>
                </li>
              </ul>
              <div className="smallBtn">
                <button className="red" onClick={() => {
                  this.onBreak(item.ID)
                }}>
                  学校详情
                </button>
              </div>
            </div>
          </li>
        })
      } else if (openMajorSchool.openMajorSchool.data.S == 0) {
        listItem = <div style={{border: 'none', paddingTop: '.1rem'}}>
          <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.6rem'}}>
            <use xlinkHref="#icon-zanwuneirong-"></use>
          </svg>
          <strong>暂无数据</strong></div>
      }
    }

    return (
      <div>
        <div className={styles.list}>
          <ul >
            {listItem}
          </ul>
          <div
            style={{display: this.state.page == PageCount && openMajorSchool.openMajorSchool.data.S == 0 ? 'none' : 'block'}}
            onClick={() => {
              this.onLoadMore()
            }}>
            <More  {...this.props}></More>
          </div>
        </div>
      </div>
    )
  }
}
