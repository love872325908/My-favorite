import React, {Component} from 'react'
import classNames from 'classnames'
import styles from './Category.less'
import {Link} from 'dva/router';
import {GetRequest} from '../../services/service.js'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {bigId: 0, id: 0, infoIndex: 0, bigFlag: false, smallFlag: false, schoolInfo: false};
    this.showBig = this.showBig.bind(this)
    this.showSmall = this.showSmall.bind(this)
    this.goToNextPage = this.goToNextPage.bind(this)
    this.openMajorInfo = this.openMajorInfo.bind(this)
  }

  componentDidMount() {
    const {history} = this.props;
    // history.push(`/searchmajor?&bigid=1`)
  }

  onChangeBigBtn(id) {
    this.setState({bigId: id});
    const {history} = this.props;
    let argument = GetRequest();
    history.push(`searchmajor?&bigid=${id + 1}`)
  }

  onChangeSmaBtn(id) {
    this.setState({id: id});
    const {history} = this.props;
    let argument = GetRequest();
    history.push(`searchmajor?&bigid=${argument.bigid}`)
  }

  showBig() {
    this.setState({bigFlag: !this.state.bigFlag})
  }

  showSmall() {
    this.setState({smallFlag: !this.state.smallFlag})
  }

  showInfo(index) {
    this.setState({schoolInfo: false})
    if(this.state.infoIndex == index){
      this.setState({schoolInfo: !this.state.schoolInfo})
    }else{
      this.setState({infoIndex: index, schoolInfo: true})
    }
  }

  goToNextPage(specialname, item) {
    const {history, dispatch} = this.props;
    console.log(item)
    dispatch({
      type: 'searchmajor/saveMajorInfo',
      payload: {
        Info: item
      }
    })
    // dispatch({
    //   type: 'searchmajor/getMajorSearch',
    //   payload: {
    //     specialname: specialname,
    //   }
    // })
    history.push(`/searchResult/openmajorschool?&specialname=${specialname}`)
  }

  openMajorInfo(specialname, item) {
    const {history, dispatch} = this.props;
    console.log(item)
    dispatch({
      type: 'searchmajor/saveMajorInfo',
      payload: {
        Info: item
      }
    })
    history.push(`/searchResult/majormsg?&specialname=${specialname}`)
  }

  render() {
    const {bigMajor, smallMajor} = this.props.searchmajor;
    const {history} = this.props;

    let bigCateList;
    if (bigMajor.bigMajor && bigMajor.bigMajor.data != undefined) {
      bigCateList = bigMajor.bigMajor.data.pList.map((item, index) => {
        return <div key={index} id={item.ID} onClick={() => {
          this.onChangeBigBtn(index)
        }} className={this.state.bigId == index ? styles.active : ''}
                    style={{display: index > 5 && !this.state.bigFlag ? 'none' : ''}}>{item.Name}</div>
      })
    } else {
      bigCateList = <div style={{border: 'none', paddingTop: '.1rem'}}>
        <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.6rem'}}>
          <use xlinkHref="#icon-zanwuneirong-"></use>
        </svg>
        <strong>暂无数据</strong></div>
    }
    let smallCateList, xuekeList;
    if (smallMajor.smallMajor && smallMajor.smallMajor.data != undefined) {
      smallCateList = smallMajor.smallMajor.data.pList.map((item, index) => {
        return <div key={index} id={item.ID} onClick={() => {
          this.onChangeSmaBtn(index)
        }} className={this.state.id == index ? styles.active : ''}
                    style={{display: index > 5 && !this.state.smallFlag ? 'none' : ''}}>{item.specialname}</div>
      })
      xuekeList = smallMajor.smallMajor.data.pList.map((item, index) => {
        return <li id={index} key={index}>
          <div className={styles.titleName} onClick={() => {
            this.showInfo(index)
          }}>
            <div className={classNames(styles.specialtyTypes)}>{item.specialname}</div>
            <div className={classNames(styles.viewDetails)}>
              {this.state.schoolInfo && this.state.infoIndex == index ? '收起' : '查看详情'}
            </div>
          </div>
          <div className={classNames(styles.olYearScore)}
               style={{display: this.state.schoolInfo && this.state.infoIndex == index ? 'block' : 'none'}}>
            <ul>
              <li>专业大类:<span>&nbsp;{item.zytype}</span></li>
              <li>
                专业小类: <span>{item.specialname}</span>
              </li>
              <li>
                专业代码：<span>{item.code}</span>
              </li>
            </ul>
            <div className={classNames(styles.btnBox, 'smallBtn')}>
              <button className="red" onClick={() => {
                this.openMajorInfo(item.specialname, item)
              }}>专业详情
              </button>
              <button className='blue' onClick={() => {
                this.goToNextPage(item.specialname, item)
              }}>开设院校
              </button>
            </div>
          </div>
        </li>
      })
    } else {
      smallCateList =
        <div style={{border: 'none', height: '.6rem', display: 'flex', justifyContent: 'center', width: '100%'}}>
          <div style={{border: 'none', paddingTop: '.1rem', height: '.6rem'}}>
            <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.6rem'}}>
              <use xlinkHref="#icon-zanwuneirong-"></use>
            </svg>
            <strong>暂无数据</strong></div>
        </div>
    }

    return (
      <div>
        <div className={classNames(styles.categoryBox)}>
          <h3 className={classNames(styles.categoryTitle)}>
            {this.props.title}
          </h3>
          <div className={classNames(styles.bigCateBox)}>
            {bigCateList}
          </div>
          <div className={classNames(styles.openAll)} onClick={() => {
            this.showBig()
          }}>
            <span>{this.state.bigFlag ? '收起' : '展开全部'}</span>
          </div>
        </div>
        {/*<div className={classNames('clearfix')}>
          <h3 className={classNames(styles.categoryTitle)}>
            专业小类
          </h3>
          <div className={classNames(styles.smallCateBox)}>
            {smallCateList}
          </div>
          <div className={classNames(styles.openAll)} onClick={() => {
            this.showSmall()
          }}>
            <span>{this.state.smallFlag ? '收起' : '展开全部'}</span>
          </div>
        </div>*/}
        <div>
          <ul className={classNames(styles.majorName)}>
            {xuekeList}
          </ul>
        </div>
      </div>
    )
  }
}
