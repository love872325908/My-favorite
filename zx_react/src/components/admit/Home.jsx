import React from 'react'
import styles from './Home.less'
import classNames from 'classnames';
import {Link} from 'dva/router';
import Selects from '../common/Select';
import Navbar from '../common/Navbar'
import Toast from '../common/Toast'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      SchoolID: 0,
    }
    this.sendOption = this.sendOption.bind(this);
    // this.onSubmitBtn = this.onSubmitBtn.bind(this);
  }

  componentDidMount() {
    const {history, dispatch} = this.props;
    dispatch({
      type: 'getSchool/getSchoolList',
      payload: {
        page: this.state.page
      }
    })
    dispatch({type: 'score/DelSchoolList'});
    dispatch({type: 'score/GetSchoolType'})
  }

  onSubmitBtn() {
    const {history, dispatch, getSchool, score} = this.props;
    console.log(score)
    if (score.schoolName == '请选择大学') {
      dispatch({type: 'getRegion/showPicker', payload: false})
      dispatch({type: 'getRegion/toggleShow', payload: {open: true, info: '请选择大学'}})
      return false;
    }
    if (score.major == '请选择专业') {
      dispatch({type: 'getRegion/showPicker', payload: false})
      dispatch({type: 'getRegion/toggleShow', payload: {open: true, info: '请选择专业'}})
      return false;
    }
    if (score.major == '暂无数据') {
      dispatch({type: 'getRegion/showPicker', payload: false})
      dispatch({type: 'getRegion/toggleShow', payload: {open: true, info: '暂无数据'}})
      return false;
    }
    let sgInfoArr = []
    let arr = [], sid;
    if (score.SchoolName) {
      score.SchoolName.data.SchoolList.map((item, i) => {
        if (score.schoolName == item.schoolname) {
          sid = item.ID;
        }
      })
      this.setState({SchoolID: sid})
      arr.push({
        ycID: sid,
        page: this.state.page
      })
      dispatch({type: 'queryresult/saveAcceptingData', payload: arr});
      dispatch({type: 'queryresult/saveDate', payload: sgInfoArr});
      dispatch({
        type: 'queryresult/saveAdmitData',
        payload: {
          province: score.province,
          pc: score.pc,
          Wl: score.Wl,
          schoolCity: score.schoolCity,
          id: sid,
          sname: score.major,
          schoolName: score.schoolName,
          page: score.SchoolName.data.CurrentPage,
        }
      })
      history.push(`/queryresult`)
    }
  }

  onNextPage() {
    const {history, dispatch} = this.props;
    dispatch({
      type: 'getSchool/getSchoolList',
      payload: {
        page: this.state.page
      }
    })
  }

  sendOption(val) {
    const {dispatch, score} = this.props;
    dispatch({type: 'getRegion/showPicker', payload: true})
    dispatch({type: 'score/selectOption', payload: val})
    let pid, sid;
    score.CityList.data.pList.map((item) => {
      if (score.province == item.ProvinceName) {
        pid = item.ID;
      }
    })
    console.log(score.schoolName == '请选择大学' ? true : false)
    console.log(val)
    if (val == 'schoolName') {
      const {score, dispatch, getSchool} = this.props;
      dispatch({type: 'score/GetSchooList', payload: {province: score.schoolCity, schoolType: score.schoolType}})
    } else if (val == 'major') {
      const {score, dispatch} = this.props;
      if (score.schoolName && score.schoolName == '请选择大学') {
        dispatch({type: 'getRegion/showPicker', payload: false})
        dispatch({type: 'getRegion/toggleShow', payload: {open: true, info: '请选择大学'}})
        return false;
      } else {
        let sid;
        score.SchoolName.data.SchoolList.map((item, i) => {
          if (score.schoolName == item.schoolname) {
            sid = item.ID;
          }
        })
        console.log(score.Wl)
        dispatch({type: 'getRegion/showPicker', payload: true})
        dispatch({type: 'score/selectOption', payload: val})
        dispatch({
          type: 'voluteercar/getMajorList', payload: {
            SchoolID: sid,
            AreaID: pid,
            wl: score.Wl
          }
        });
      }
    }
  }

  render() {
    const {score,dispatch} = this.props;
    return (
      <section className={classNames(styles.admitDst, 'clearfix')}>
        <div>
          <Navbar {...this.props} title='录取分布' backSchool></Navbar>
        </div>
        <Toast {...this.props}/>
        <div className={classNames(styles.fromBox, 'clearfix')}
        >
          <h3>高校各专业分数线查询</h3>
          <div className={classNames(styles.selectfrom)}>
            <ul>
              <li>
                使用省市：&nbsp;
                <span className={classNames(styles.province)}>全国29省市</span>&nbsp;
                <span className={classNames(styles.hintMsg)}>
                  ( 浙江、西藏考生无法使用，不含上海、北京、江西2015年专科批次录取数据，不含安徽、海南2015年本科三批录取数据 )
                                </span>
              </li>
              <li className={classNames('clearfix')}>
                <span>使用说明：</span>
                <ol>
                  <li>1.请正确选择院校名称中对应的批次</li>
                  <li>2.可查询具体专业往年录取考生成绩分布</li>
                  <li>3.查询结果可在个人中心-使用记录中重复查看</li>
                  <li>4.江苏考生只提供最佳3年数据</li>
                </ol>
              </li>
              <li className={classNames(styles.selecBox)}>
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
                    <span style={{paddingRight: '.095rem'}}>考生文理科</span>
                  </div>
                  <div className={styles.right} onClick={() => this.sendOption('wl')}>
                    <div></div>
                    <p>{score.Wl}</p>
                  </div>
                </div>
                <div className={styles.opt}>
                  <div className={styles.left}>
                    <span style={{paddingRight: '.085rem'}}>院校所在地</span>
                  </div>
                  <div className={styles.right} onClick={() => this.sendOption('schoolCity')}>
                    <div></div>
                    <p>{score.schoolCity}</p>
                  </div>
                </div>
                <div className={styles.opt}>
                  <div className={styles.left}>
                    <span style={{paddingRight: '.085rem'}}>院校类型</span>
                  </div>
                  <div className={styles.right} onClick={() => this.sendOption('schoolType')}>
                    <div></div>
                    <p>{score.schoolType}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.opt}>
                  <div className={styles.left}>
                    <span style={{paddingRight: '.095rem'}}>院校名称</span>
                  </div>
                  <div className={styles.right} onClick={() => this.sendOption('schoolName')}>
                    <div></div>
                    <p>{score.schoolName}</p>
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.opt}>
                  <div className={styles.left}>
                    <span style={{paddingRight: '.085rem'}}>专业名称</span>
                  </div>
                  <div className={styles.right} onClick={() => this.sendOption('major')}>
                    <div></div>
                    <p>{score.major}</p>
                  </div>
                </div>
              </li>
              <li className={styles.submitBtn}>
                <button onClick={this.onSubmitBtn.bind(this) }>录取分布</button>
              </li>
            </ul>
          </div>
        </div>
        <Selects {...this.props}/>
      </section>
    )
  }
}
