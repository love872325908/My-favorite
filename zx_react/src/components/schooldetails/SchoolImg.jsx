import React, {Component} from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import Navbar from '../common/Navbar';
import {GetRequest} from '../../services/service'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showOver:false
    }
  }

  componentDidMount() {
    const {history, queryresult, schooldetails} = this.props;
    console.log(queryresult,schooldetails)
    // alert(schooldetails.MajorDetail)
    console.log(schooldetails.MajorDetail.length)
    if(schooldetails.MajorDetail.length == 0){

    }

    // if (queryresult && !queryresult.LineFire && schooldetails && !schooldetails.MajorDetail ) {
    //   alert(1)
    //   let argument = GetRequest();
    //   if(argument.cutoffscore){
    //     // history.push(`/schooldetails/cutoffscore?&ID=${argument.cutoffscore}`)
    //   }else if(argument.schoolmajor){
    //     // history.push(`/schooldetails/schoolmajor?&ID=${argument.schoolmajor}`)
    //   }
    // }
  }
  render() {
    const {history, queryresult, schooldetails} = this.props;
    const {MajorDetail} = this.props.schooldetails;
    const {LineFire} = this.props.queryresult;
    // alert(MajorDetail,LineFire)
    let LineList, yearList = [];
    if (LineFire) {
      console.log(LineFire)
      if (LineFire.LineFire && LineFire.LineFire.data.S == '1') {
        // alert(1)
        LineList = LineFire.LineFire.data.sList.map((item, index) => {
          console.log(item)
          if (item.year) {
            yearList[index] = {
              year: item.year,
              varfs: item.varfs,
              minfs: item.minfs,
              maxfs: item.maxfs,
              stype: item.stype
            }
            console.log(yearList.length)
            if (yearList.length == 4) {
              // yearList.del(3)
              return <ul key={index} className={classNames(styles.major_his_line)}>
                <li>【{item.schoolName}】往年在【{item.province}】&nbsp;【{item.specialname}】专业【{item.stype}】【{item.pc}】历年分数线
                </li>
                <li>
                  <div>{yearList[0].year}年</div>
                  <ul className={classNames(styles.titleYear, 'clearfix')}>
                    <li>
                      最高分：&nbsp;&nbsp;{yearList[0].maxfs == 0 ? '--' : yearList[0].maxfs}
                    </li>
                    <li>
                      平均分：&nbsp;&nbsp;{yearList[0].varfs == 0 ? '--' : yearList[0].varfs}
                    </li>
                    <li>
                      最低分：&nbsp;&nbsp;{yearList[0].minfs == 0 ? '--' : yearList[0].minfs}
                    </li>
                  </ul>
                </li>
                <li>
                  <div>{yearList[1].year}年</div>
                  <ul className={classNames(styles.titleYear, 'clearfix')}>
                    <li>
                      最高分：&nbsp;&nbsp;{yearList[1].maxfs == 0 ? '--' : yearList[1].maxfs}
                    </li>
                    <li>
                      平均分：&nbsp;&nbsp;{yearList[1].varfs == 0 ? '--' : yearList[1].varfs}
                    </li>
                    <li>
                      最低分：&nbsp;&nbsp;{yearList[1].minfs == 0 ? '--' : yearList[1].minfs}
                    </li>
                  </ul>
                </li>
                <li>
                  <div>{yearList[2].year}年</div>
                  <ul className={classNames(styles.titleYear, 'clearfix')}>
                    <li>
                      最高分：&nbsp;&nbsp;{yearList[2].maxfs == 0 ? '--' : yearList[2].maxfs}
                    </li>
                    <li>
                      平均分：&nbsp;&nbsp;{yearList[2].varfs == 0 ? '--' : yearList[2].varfs}
                    </li>
                    <li>
                      最低分：&nbsp;&nbsp;{yearList[2].minfs == 0 ? '--' : yearList[2].minfs}
                    </li>
                  </ul>
                </li>
              </ul>
            }
          }
        })
      }
    }
    let md;
    console.log(MajorDetail)
    if (MajorDetail.length != 0) {
      if (MajorDetail.data.S == '1') {
        md = MajorDetail.data.pList.map((item, index) => {
          return <div key={index} style={{padding: '.1rem'}}>
            <h3>专业介绍</h3>
            <p style={{lineHeight: '.3rem'}} dangerouslySetInnerHTML={{__html: item.intro}}></p>
          </div>
        })
      }
    }
    // if(queryresult.LineFire){
    //   if (!queryresult.LineFire.LineFire) {
    //     alert(2)
    //     let argument = GetRequest();
    //     if(argument.cutoffscore){
    //       // history.push(`/schooldetails/cutoffscore?&ID=${argument.cutoffscore}`)
    //     }else if(argument.schoolmajor){
    //       // history.push(`/schooldetails/schoolmajor?&ID=${argument.schoolmajor}`)
    //     }
    //   }
    // }
    // alert(LineList,md)
    return (
      <div style={{marginTop: '.45rem'}}>
        <Navbar title='专业历年分数线' {...this.props} backSchool/>
        {LineList}
        {md}
      </div>
    )
  }
}
