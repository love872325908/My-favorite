import React, {Component} from 'react';
import Navbar from '../common/Navbar'
import HeaderMsg from './HeaderMsg'
import DisplayItem from './DisplayItem'
import Graph from './Graph'
import Specialty from './Specialty'
import {NavLink} from 'dva/router';
import styles from './Home.less';

/*
 * Navbar => 顶部通栏
 * HeaderMsg => 学校信息
 * DisplayItem => 显示项
 * AllyearInfo => 查询信息
 * Graph => 曲线图
 * Specialty => 专业列表
 * */
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, score} = this.props;
    const {AdmitData} = this.props.queryresult;
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
    console.log(AdmitData)
    dispatch({
      type: 'score/GetSchoolLine',
      payload: {
        wl: AdmitData.Wl,
        province: AdmitData.province,
        pc: AdmitData.pc,
        professional: AdmitData.sname,
        ID: parseInt(AdmitData.id),
        year: 2016
      }
    })
    dispatch({
      type: 'queryresult/getMajorLineFire',
      payload: {
        wl: AdmitData.Wl,
        province: provinceid,
        pcid: batchid,
        sname: AdmitData.sname,
        SchoolID: parseInt(AdmitData.id),
      }
    })
  }

  render() {
    const {queryresult, score, history} = this.props;
    console.log(queryresult.AdmitData)
    if (queryresult.AdmitData == undefined) {
      history.push(`/admit`)
    }
    return (
      <div className={styles.queryResultBox}>
        <Navbar {...this.props} title='查询结果' back="admit"></Navbar>
        <div className={styles.schoolInfo}>
          <HeaderMsg {...this.props}></HeaderMsg>
          <DisplayItem {...this.props}></DisplayItem>
        </div>
        <Graph {...this.props}></Graph>
        {/*<Specialty {...this.props}></Specialty>*/}
      </div>
    )
  }
}
