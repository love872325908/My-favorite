import React, {Component} from 'react'
import styles from '../Home.less'
import classNames from 'classnames'
import Select from '../../common/Select';
import {GetRequest} from '../../../services/service'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoIndex: 0,
      schoolInfo: false,
    }
    this.sendOption = this.sendOption.bind(this);
  }

  sendOption(val) {
    const {dispatch} = this.props;
    console.log(val)
    dispatch({type: 'getRegion/showPicker', payload: true})
    dispatch({type: 'score/selectOption', payload: val})
    dispatch({type: 'score/changeOption', payload: val})
  }

  query() {
    const {dispatch, score, schooldetails} = this.props;
    let argument = GetRequest();
    let PID = 1;
    score.CityList.data.pList.map((item) => {
      if (item.ProvinceName == score.province) {
        PID = item.ID;
      }
    })
    if (PID) {
      dispatch({
        type: 'schooldetails/genSchoolMajor',
        payload: {
          year: score.year, wl: score.Wl, AreaID: PID,
          SID: schooldetails.SchoolId.ID ? schooldetails.SchoolId.ID : arguments.ID
        }
      })
    }
  }

  showInfo(index) {
    this.setState({schoolInfo: false})
    if (this.state.infoIndex == index) {
      this.setState({schoolInfo: !this.state.schoolInfo})
    } else {
      this.setState({infoIndex: index, schoolInfo: true})
    }
  }

  goToHistory(wl, sname, index, zid) {
    const {history, dispatch, location, score} = this.props;
    let argument = GetRequest();
    let batchid, provinceid;
    score.BatchList.data.pList.map((item) => {
      if (item.Name == score.pc) {
        if (item.ID) {
          batchid = item.ID;
        }
      }
    })
    score.CityList.data.pList.map((item) => {
      if (item.ProvinceName == score.province) {
        provinceid = item.ID;
      }
    })
    dispatch({
      type: 'queryresult/getMajorLineFire',
      payload: {
        wl: wl,
        province: provinceid,
        pcid: batchid,
        sname: sname,
        SchoolID: argument.ID,
      }
    })
    dispatch({
      type: 'schooldetails/getSchoolMajorDetail',
      payload: {
        schoolid: argument.ID,
        zid: parseInt(zid)
      }
    })
    dispatch({type: 'home/schoolUrl', payload: location.pathname + location.search})
    dispatch({
      type: 'schooldetails/getQuerySchoolInfo',
      payload: {argument: argument}
    })
    dispatch({
      type: 'schooldetails/saveSeletMajor',
      payload: {
        seletMajor: {
          wl: wl,
          sname: sname,
          index: index
        }
      }
    })
    history.push(`/majorHistoryLine?&schoolmajor=${argument.ID}`)
  }

  goToAdmit(item) {
    const {history, dispatch, location} = this.props;
    dispatch({type: 'score/changeYear', payload: item.year})
    dispatch({type: 'score/changeWl', payload: item.wl})
    dispatch({type: 'score/changeSchoolCity', payload: item.ProvinceName})
    dispatch({type: 'score/changeSchoolName', payload: item.schoolname})
    dispatch({type: 'score/changePc', payload: item.pc})
    dispatch({type: 'score/changeMajor', payload: item.specialname})
    dispatch({type: 'home/schoolUrl', payload: location.pathname + location.search})
    history.push(`/admit`)
  }

  render() {
    const {score, schooldetails} = this.props;
    let major;
    if (schooldetails.SchoolMajorList) {
      if (schooldetails.SchoolMajorList.data.S == 1) {
        major = schooldetails.SchoolMajorList.data.MajorList.map((item, index) => {
          return <li onClick={() => {
            this.showInfo(index)
          }} id={index} key={index}>
            <div className={styles.titleName}>
              <div className={classNames(styles.specialtyTypes)}>{item.specialname}</div>
              <div
                className={classNames(styles.viewDetails)}>{this.state.schoolInfo && this.state.infoIndex == index ? '收起' : '查看详情'}</div>
            </div>
            <div className={classNames(styles.olYearScore)}
                 style={{display: this.state.schoolInfo && this.state.infoIndex == index ? 'block' : 'none'}}>
              <ul>
                <li>专业大类:<span>&nbsp;{item.specialMax ? item.specialMax : '--'}</span></li>
                <li>
                  专业小类: <span>{item.specialSmall ? item.specialSmall : '--'}</span>
                </li>
              </ul>
              <ul>
                <li>
                  最高分：<span>{item.maxfs == 0 ? '--' : item.maxfs }</span>
                </li>
                <li>
                  平均分：<span>{item.varfs == 0 ? '--' : item.varfs}</span>
                </li>
                <li>
                  最低分：<span>{item.minfs == 0 ? '--' : item.minfs}</span>
                </li>
                <li>
                  批次：<span>{item.pc ? item.pc : '--'}</span>
                </li>
                <li>
                  文理：<span>{item.wl ? item.wl : '--'}</span>
                </li>
                <li>
                  年份：<span>{item.year ? item.year : '--'}</span>
                </li>
              </ul>
              <div className={classNames(styles.btn, 'smallBtn', 'clearfix')}>
                <button className='red' onClick={() => {
                  this.goToHistory(item.wl, item.specialname, index, item.zid)
                }}>历年分数线
                </button>
                <button className="blue" onClick={() => this.goToAdmit(item)}>录取分布</button>
              </div>
            </div>
          </li>
        })
      } else {
        major = <div style={{border: 'none', paddingTop: '.1rem'}}>
          <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
            <use xlinkHref="#icon-zanwuneirong-"></use>
          </svg>
          <strong>暂无数据</strong></div>
      }
    }

    return (
      <div className={classNames(styles.cutoffScoreBox)}>
        <div className={classNames(styles.setGradeLine)}>
          <h4>专业设置及分数线</h4>
          <div className={classNames(styles.pushList, 'clearfix')}>
            <div className={styles.opt}>
              <div className={styles.left}>
                <span>年份</span>
              </div>
              <div className={styles.left} onClick={() => this.sendOption('year')}>
                <div></div>
                <p>{score.year}</p>
              </div>
            </div>
            <div className={styles.opt}>
              <div className={styles.left}>
                <span style={{paddingRight: '.095rem'}}>文理分科</span>
              </div>
              <div className={styles.right} onClick={() => this.sendOption('wl')}>
                <div></div>
                <p>{score.Wl}</p>
              </div>
            </div>
            <div className={styles.opt}>
              <div className={styles.left}>
                <span style={{paddingRight: '.085rem'}}>考生所在地</span>
              </div>
              <div className={styles.right} onClick={() => this.sendOption('province')}>
                <div></div>
                <p>{score.province}</p>
              </div>
            </div>
          </div>
          <div className='bigBtn'>
            <button onClick={() => this.query()}>确认查询</button>
          </div>
          <div className={classNames(styles.MajorList)}>
            <ul>
              {major}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
