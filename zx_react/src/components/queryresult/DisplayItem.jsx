import React from 'react'
import styles from './DisplayItem.less'
import classNames from 'classnames';
import styless from './AllyearInfo.less'
import ReactSwipe from 'react-swipes'
let cheakArr = []
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      cheakBoxOption: [
        {
          index: 0,
          isCheak: true,
        },
        {
          index: 1,
          isCheak: true,
        },
        {
          index: 2,
          isCheak: true,
        },
        {
          index: 3,
          isCheak: true,
        },
        {
          index: 4,
          isCheak: true,
        },
        {
          index: 5,
          isCheak: true,
        },
        {
          index: 6,
          isCheak: true,
        },
      ],
      indexArr: [],
      index: 1
    };
  }

  onClickType = (index) => {
    let cheakArr = this.state.cheakBoxOption;
    if (index == 4) {
      const {dispatch, queryresult} = this.props;
      dispatch({
        type: 'queryresult/graphShow',
        payload: !queryresult.isShow
      })
    }
    if (cheakArr[index].isCheak) {
      cheakArr[index].isCheak = false;
    } else {
      cheakArr[index].isCheak = true;
    }
    this.setState({cheakBoxOption: cheakArr})
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
    const arr = ['省控线', '分数', '分差', '位次', '曲线图', '安全线/门栏线', '平均分/最低分']
    let list = arr.map((item, index) => {
      return <div key={index} onClick={() => {
        this.onClickType(index)
      }} className={this.state.cheakBoxOption[index].isCheak ? styles.active : ''}>{item}</div>
    })

    const {SchoolLine} = this.props.score;
    let Y = this.state.index;
    let opt = {
      distance: 52, // 每次移动的距离，卡片的真实宽度
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
        case i:
          Y = i;
          break;
      }
    }
    yearList = year.map((item, index) => {
      return <li key={index} onClick={() => {
        this.changeYear(item);
        this.setState({index: index})
      }} className={styles.active}>{item}</li>
    })
    let schoolgMsgList, cheakArr = this.state.cheakBoxOption;
    if (SchoolLine) {
      console.log(SchoolLine)
      if (SchoolLine && SchoolLine.data.S == '1') {
        schoolgMsgList = SchoolLine.data.sList.map((item, index) => {
          console.log(item)
          return <ul key={index} id={item.ID} className={classNames(styless.schoolMsg, 'clearfix')}>
            <li style={{display: cheakArr[0].isCheak ? 'block' : 'none'}}>
              省控线：<span>{item.provincescore}</span></li>
            <li style={{display: cheakArr[1].isCheak && cheakArr[6].isCheak ? 'block' : 'none'}}>
              最高分：<span>{item.maxfs == 0 ? '--' : item.maxfs}</span></li>
            <li style={{display: cheakArr[1].isCheak ? 'block' : 'none'}}>
              平均分：<span>{item.varfs == 0 ? '--' : item.varfs}</span></li>
            <li style={{display: cheakArr[1].isCheak && cheakArr[6].isCheak ? 'block' : 'none'}}>
              最低分：<span>{item.minfs == 0 ? '--' : item.minfs}</span></li>
            <li style={{display: cheakArr[2].isCheak ? 'block' : 'none'}}>
              分差（最高分）：<span>{item.PoorMaxfs == 0 ? '--' : item.PoorMaxfs}</span></li>
            <li style={{display: cheakArr[2].isCheak && cheakArr[5].isCheak ? 'block' : 'none'}}>
              分差（安全线）：<span>{item.PoorVarfs == 0 ? '--' : item.PoorVarfs}</span></li>
            <li style={{display: cheakArr[2].isCheak && cheakArr[5].isCheak ? 'block' : 'none'}}>
              分差（门栏线）：<span>{item.PoorMinfs == 0 ? '--' : item.PoorMinfs}</span></li>
            <li style={{display: cheakArr[3].isCheak ? 'block' : 'none'}}>最高分位次：<span>-</span></li>
            <li style={{display: cheakArr[3].isCheak ? 'block' : 'none'}}>安全线位次：<span>-</span></li>
            <li style={{display: cheakArr[3].isCheak ? 'block' : 'none'}}>门栏线位次：<span>-</span></li>
            <li>录取人数：<span>-</span></li>
            <li>文理：<span>{item.stype}</span></li>
          </ul>
        })
      } else {
        schoolgMsgList = <div style={{border: 'none', paddingTop: '.1rem', textAlign: 'center'}}>
          <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
            <use xlinkHref="#icon-zanwuneirong-"></use>
          </svg>
          <span style={{fontSize: '.14rem', color: '#A5A5A5'}}>暂无数据</span></div>
      }
    }
    return (
      <div>
        <div className={classNames(styles.displayBtnBox, 'clearfix')}>
          <h3>显示项</h3>
          <div className={styles.displayBtn}>
            {list}
          </div>
        </div>
        <div className={classNames(styless.oySchoolInfo, 'clearfix')}>
          <ul className={classNames(styless.xuanze1, "clearfix")}>
            <ReactSwipe className={classNames(styless.xuanze, "clearfix")} options={opt}>
              {yearList}
              <span style={{transform: `translateX(${Y * .7667}rem)`}}></span>
            </ReactSwipe>
          </ul>
          <div>
            {schoolgMsgList}
          </div>
        </div>
      </div>
    )
  }
}
