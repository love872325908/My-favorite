import React from 'react'
import styles from './AllyearInfo.less'
import classNames from 'classnames';
import ReactSwipe from 'react-swipes'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {index: 0, oldUrl: ''}
  }

  componentDidMount() {
    let oldHref = location.href;
    this.setState({oldUrl: oldHref})
  }

  changeYear(item) {
    const {dispatch} = this.props;
    const {AdmitData} = this.props.queryresult;
    dispatch({
      type: 'score/GetSchoolLine',
      payload: {
        wl: AdmitData.Wl,
        province: AdmitData.province,
        pc: AdmitData.pc,
        professional: AdmitData.sname,
        ID: parseInt(AdmitData.id),
        year: item
      }
    })
  }

  render() {
    const {SchoolLine} = this.props.score;
    let Y = this.state.index;
    let opt = {
      distance: 29, // 每次移动的距离，卡片的真实宽度
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
    let year = [], yearList;
    for (var i = new Date().getFullYear(); i > new Date().getFullYear() - 15; i--) {
      year.push(i);
    }
    for (let i = 0; i < year.length; i++) {
      switch (this.state.index) {
        case i + 1:
          Y = i;
          break;
      }
    }
    yearList = year.map((item, index) => {
      return <li key={index} onClick={() => {
        this.changeYear(item);
        this.setState({index: index + 1})
      }} className={styles.active}>{item}</li>
    })
    let schoolgMsgList;
    if (SchoolLine) {
      if (SchoolLine && SchoolLine.data.S == '1') {
        schoolgMsgList = SchoolLine.data.sList.map((item, index) => {
          console.log('------item--------')
          console.log(item)
          return <ul key={index} id={item.ID} className={styles.schoolMsg}>
            <li >省控线：<span>{item.provincescore}</span></li>
            <li>最高分：<span>{item.maxfs}</span></li>
            <li>安全线：<span>{item.varfs}</span></li>
            <li>门栏线：<span>{item.minfs}</span></li>
            <li>分差（最高分）：<span>{item.PoorMaxfs}</span></li>
            <li>分差（安全线）：<span>{item.PoorVarfs}</span></li>
            <li>分差（门栏线）：<span>{item.PoorMinfs}</span></li>
            <li>最高分位次：<span>501</span></li>
            <li>安全线位次：<span>501</span></li>
            <li>门栏线位次：<span>501</span></li>
            <li>录取人数：<span>501</span></li>
          </ul>
        })
      } else {
        schoolgMsgList = <div style={{border:'none',paddingTop:'.1rem'}}><svg className="icon" aria-hidden="true" style={{width:'100%',height:'.6rem'}} >
          <use xlinkHref="#icon-zanwuneirong-"></use>
        </svg>
          <strong>暂无数据</strong></div>
      }
    }
    return (
      <div className={classNames(styles.oySchoolInfo, 'clearfix')}>
        <ul className={classNames(styles.xuanze1, "clearfix")}>
          <ReactSwipe className={classNames(styles.xuanze, "clearfix")} options={opt}>
            {yearList}
            <span style={{transform: `translateX(${Y * .5284}rem)`}}></span>
          </ReactSwipe>
        </ul>
        <div>
          {schoolgMsgList}
        </div>
      </div>
    )
  }
}
