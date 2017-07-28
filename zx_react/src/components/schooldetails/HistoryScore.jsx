import React, {Component} from 'react'
import {Route, NavLink} from 'dva/router';
import styles from './Home.less'
import classNames from 'classnames'
import Graph from '../common/Graph'
import {GetRequest} from '../../services/service'
import SMC from './sdcommen/SchoolMsgCpt'
import SetGradeLine from './sdcommen/SetGradeLine'
import Select from '../common/Select';
import ReactSwipe from 'react-swipes'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      year: 2017,
      graphData: [],
      batchid: 0,
      provinceid: 0
    }
    this.sendOption = this.sendOption.bind(this);
  }

  sendOption(val) {
    const {dispatch} = this.props;
    dispatch({type: 'getRegion/showPicker', payload: true})
    dispatch({type: 'score/selectOption', payload: val})
    dispatch({type: 'score/changeOption', payload: val})
  }

  componentDidMount() {
    const {dispatch, score, schooldetails} = this.props;
    let argument = GetRequest();
    let batchid, provinceid;
    if (score.BatchList && score.CityList) {
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
        type: 'schooldetails/genHistoryGrade',
        payload: {
          year: 2017,
          wl: score.Wl,
          batchid: batchid ? batchid : '',
          provinceid: provinceid,
          schoolid: schooldetails.SchoolId.ID
        }
      })
      dispatch({
        type: 'schooldetails/genHistoryGrade',
        payload: {
          wl: score.Wl, batchid: batchid, provinceid: provinceid,
          schoolid: schooldetails.SchoolId.ID ? schooldetails.SchoolId.ID : argument.ID
        }
      })
    }
  }

  changeYear(year) {
    const {dispatch, score, schooldetails} = this.props;
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
    console.log(score.Wl)
    dispatch({
      type: 'schooldetails/genHistoryGrade',
      payload: {
        year: year,
        wl: score.Wl,
        batchid: batchid ? batchid : '',
        provinceid: provinceid,
        schoolid: schooldetails.SchoolId.ID
      }
    })
    dispatch({
      type: 'schooldetails/genHistoryGrade',
      payload: {
        wl: score.Wl, batchid: batchid, provinceid: provinceid,
        schoolid: schooldetails.SchoolId.ID ? schooldetails.SchoolId.ID : arguments.ID
      }
    })
  }

  onClickAdmit(sname) {
    const {history, score, dispatch, location} = this.props;

    console.log(score.Wl, score.province, score.pc, sname)
    dispatch({type: 'score/changeSchoolCity', payload: score.province})
    dispatch({type: 'score/changePc', payload: score.pc})
    dispatch({type: 'score/changeWl', payload: score.Wl})
    dispatch({type: 'score/changeSchoolName', payload: sname})
    dispatch({type: 'home/schoolUrl', payload: location.pathname + location.search})
    history.push(`/admit`)
  }

  render() {
    const {score, schooldetails, dispatch, history} = this.props;
    let opt = {
      distance: 55, // 每次移动的距离，卡片的真实宽度
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
    let year = [], yearList, Y, historyMsg;
    for (var i = new Date().getFullYear(); i > new Date().getFullYear() - 15; i--) {
      year.push(i);
    }
    for (let i = 0; i < year.length; i++) {
      switch (this.state.index) {
        case i:
          Y = i;
          break;
      }
    }
    let graphData = [], sname;
    if (schooldetails.GraphData) {
      console.log(schooldetails.GraphData)
      if (schooldetails.GraphData.data.S == 1) {
        schooldetails.GraphData.data.LineList.map((item, index) => {
          graphData[index] = {
            name: item.year + '年',
            doorsill: parseInt(item.min ? item.min : 0),
            safety: parseInt(item.var ? item.var : 0),
            max: parseInt(item.max ? item.max : 0),
          }
        })
      }
    }
    yearList = year.map((item, index) => {
      return <li key={index} onClick={() => {
        this.changeYear(item);
        this.setState({
          index: index,
          year: year,
        })
      }}>{item}年</li>
    })
    if (schooldetails.HistoryGrade) {
      console.log(schooldetails.HistoryGrade)
      if (schooldetails.HistoryGrade.data.S == 1) {
        historyMsg = schooldetails.HistoryGrade.data.LineList.map((item, index) => {
          return <ul key={index}>
            <li>
              <span>最高分：</span>
              <span>{item.max}</span>
            </li>
            <li>
              <span>平均分：</span>
              <span>{item.var}</span>
            </li>
            <li>
              <span>投档分：</span>
              <span>{item.min}</span>
            </li>
            <li>
              <span>录取人数：</span>
              <span>{item.num}人</span>
            </li>
            <li>
              <span>批次：</span>
              <span>{item.batch}</span>
            </li>
            <li>
              <span>文理：</span>
              <span>{item.studenttype}</span>
            </li>
          </ul>
        })
      } else {
        historyMsg = <div style={{border: 'none', paddingTop: '.1rem'}}>
          <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.6rem'}}>
            <use xlinkHref="#icon-zanwuneirong-"></use>
          </svg>
          <strong>暂无数据</strong></div>
      }
    }
    if (schooldetails.QSInfo.QSInfo && schooldetails.QSInfo.QSInfo.data != undefined) {
      sname = schooldetails.QSInfo.QSInfo.data.SchoolList[0].schoolname
    }
    return (
      <div className={classNames('clearfix', styles.schoolBox)}>
        <SMC {...this.props}></SMC>
        <div className={classNames(styles.setGradeLine)}>
          <h4>历史分数线</h4>
          <div className={classNames(styles.pushList, 'clearfix')}>
            <div className={styles.opt}>
              <div className={styles.left}>
                <span style={{paddingRight: '.085rem'}}>考生所在地</span>
              </div>
              <div className={styles.right} onClick={() => this.sendOption('province')}>
                <div></div>
                <p>{score.province}</p>
              </div>
            </div>
            <div className={styles.opt}>
              <div className={styles.left}>
                <span>批次</span>
              </div>
              <div className={styles.left} onClick={() => this.sendOption('pc')}>
                <div></div>
                <p>{score.pc}</p>
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
          </div>
        </div>
        <div className={classNames(styles.historyScore)}>
          <ul className={classNames(styles.xuanze1, "clearfix")}>
            <ReactSwipe className={classNames(styles.xuanze, "clearfix")} options={opt}>
              {yearList}
              <span style={{transform: `translateX(${Y * .788}rem)`}}></span>
            </ReactSwipe>
          </ul>
        </div>
        <div className={classNames(styles.ScopeInfo)}>
          {historyMsg}
        </div>
        <div className={classNames(styles.graphBox, 'clearfix')}>
          <ul className={classNames('clearfix')}>
            <li>
              <i></i>
              <span>最高分</span>
            </li>
            <li>
              <i></i>
              <span>安全线</span>
            </li>
            <li>
              <i></i>
              <span>门栏线</span>
            </li>
          </ul>
          {
            schooldetails.GraphData && schooldetails.GraphData.data.S == '1' ?
              <Graph {...this.props} graphData={graphData}/> :
              <div style={{border: 'none', paddingTop: '.1rem', textAlign: 'center'}}>
                <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
                  <use xlinkHref="#icon-zanwuneirong-"></use>
                </svg>
                <span style={{fontSize: '.14rem', color: '#A5A5A5'}}>暂无数据</span></div>
          }
        </div>
        <div className={classNames('bigBtn', styles.bigbtn)}>
          <button onClick={() => {
            this.onClickAdmit(sname)
          }}>录取分布
          </button>
        </div>
        <Select {...this.props}/>
      </div>
    )
  }
}
