import React, {Component} from 'react'
import styles from './Specialty.less'
import classNames from 'classnames';
import More from '../common/More'
import {GetRequest} from '../../services/service'
let arr = [];
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      schoolInfo: false,
      page: 1,
    }
    this.changePlay = this.changePlay.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.query = this.query.bind(this);
  }

  componentDidMount() {
    const {dispatch,score} = this.props;
    const {seletMajor} = this.props.schooldetails;
    let argument = GetRequest();
    if(seletMajor){
      this.setState({
        index:seletMajor.seletMajor.index,
        schoolInfo:true
      })
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
          wl: score.Wl,
          province: provinceid,
          pcid: batchid,
          sname: seletMajor.seletMajor.sname,
          SchoolID: argument.ID,
        }
      })
    }
    dispatch({
      type: 'queryresult/getSchoolMajor',
      payload: {
        Page: this.state.page,
        schoolid: argument.ID,
      }
    })
  }

  query(isShow) {
    const {dispatch} = this.props;
    dispatch({type: 'schooldetails/saveMajorShow', payload: isShow})
  }

  changePlay(index, sname, zid) {
    // if (this.state.schoolInfo == false) {
    const {dispatch, score,history,location} = this.props;
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
        wl: score.Wl,
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
    // }
    dispatch({type: 'home/schoolUrl', payload: location.pathname + location.search})
    history.push(`/majorHistoryLine?&cutoffscore=${argument.ID}`)
    // this.setState({schoolInfo: false})
    // if (this.state.index == index) {
    //   this.setState({schoolInfo: !this.state.schoolInfo})
    // } else {
    //   this.setState({index: index, schoolInfo: true})
    // }
  }

  onLoadMore() {
    const {dispatch} = this.props;
    let argument = GetRequest();
    this.setState({
      page: ++this.state.page,
    })
    dispatch({
      type: 'queryresult/getSchoolMajor',
      payload: {
        Page: this.state.page,
        schoolid: argument.ID,
      }
    })
  }

  render() {
    const {score} = this.props;
    const {LineFire, SM} = this.props.queryresult;
    let LineList, yearList = [];
    if (LineFire) {
      if (LineFire.LineFire && LineFire.LineFire.data.S == '1') {
        LineList = LineFire.LineFire.data.sList.map((item, index) => {
          if (item.year) {
            yearList[index] = {
              year: item.year,
              varfs: item.varfs,
              minfs: item.minfs,
              maxfs: item.maxfs,
              stype: item.stype
            }
            if (yearList.length == 4) {
              // yearList.del(3)
              console.log(yearList,yearList[0].maxfs,yearList[0].minfs,yearList[0].varfs)
              console.log(yearList,yearList[1].maxfs,yearList[1].minfs,yearList[1].varfs)
              console.log(yearList,yearList[2].maxfs,yearList[2].minfs,yearList[2].varfs)
              return <ul key={index}>
                {/*<li>专业名称: <span>&nbsp;{item.sname}</span></li>*/}
                <li>
                  <div>{yearList[0].year}年</div>
                  <ul className={classNames(styles.titleName, 'clearfix')}>
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
                  <ul className={classNames(styles.titleName, 'clearfix')}>
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
                  <ul className={classNames(styles.titleName, 'clearfix')}>
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
                <li className='bigBtn' onClick={() => {
                  this.query('list')
                }}><button>专业介绍</button>
                </li>
              </ul>
            }
          }
        })
      }
    }
    let listItem;
    if (SM) {
      if (SM.SM && SM.SM.data.S == 1) {
        listItem = SM.SM.data.sList.map((item, index) => {
          arr.push(item)
        })
        listItem = arr.quChong().map((item, index) => {
          return <li key={index} className='clearfix' onClick={() => {
            this.changePlay(index, item.sname, item.zid)
          }}>
            <div className={classNames(styles.titleName, 'clearfix')}>
              <div className={classNames(styles.specialtyTypes)}>{item.sname}</div>
              {/*<div*/}
                {/*className={classNames(styles.viewDetails)}>{this.state.schoolInfo && this.state.index == index ? '收起' : '查看详情'}</div>*/}
              <div
                className={classNames(styles.viewDetails)}>查看详情</div>
            </div>
            <div className={classNames(styles.olYearScore)}
                 style={{display: this.state.schoolInfo && this.state.index == index ? 'block' : 'none'}}>
              {/*{LineList ? LineList : ''}*/}
            </div>
          </li>
        })
      }
    } else {
      listItem = <div style={{border: 'none', paddingTop: '.1rem', textAlign: 'center'}}>
        <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
          <use xlinkHref="#icon-zanwuneirong-"></use>
        </svg>
        <span style={{fontSize: '.14rem', color: '#A5A5A5'}}>暂无数据</span></div>
    }
    return (
      <div>
        {
          SM && SM.SM && SM.SM.data.S == 1 ? <section className={classNames(styles.Accordion, 'clearfix')}>
            <h3>本校【{score.province}】地区【{score.pc}】录取专业</h3>
            <ul className={classNames(styles.majorName)}>
              {listItem}
            </ul>
            <div onClick={() => {
              this.onLoadMore()
            }}>
              <More  {...this.props}></More>
            </div>
          </section> : <div style={{border: 'none', paddingTop: '.1rem', textAlign: 'center'}}>
            <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
              <use xlinkHref="#icon-zanwuneirong-"></use>
            </svg>
            <span style={{fontSize: '.14rem', color: '#A5A5A5'}}>暂无数据</span></div>
        }
      </div>
    )
  }
}
