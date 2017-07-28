import React, {Component} from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import {GetRequest} from '../../services/service'
import Specialty from '../queryresult/Specialty'
import ReactSwipe from 'react-swipes';
import Select from '../common/Select';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
    }
    this.sendOption = this.sendOption.bind(this);
    this.show = this.show.bind(this);
  }

  sendOption(val) {
    const {dispatch} = this.props;
    console.log(val)
    dispatch({type: 'getRegion/showPicker', payload: true})
    dispatch({type: 'score/selectOption', payload: val})
    dispatch({type: 'score/changeOption', payload: val})
  }

  componentDidMount() {
    // const {dispatch, schooldetails, history} = this.props;
    // let argument = GetRequest();
  }

  show(isShow) {
    const {dispatch} = this.props;
    dispatch({type: 'schooldetails/saveMajorShow', payload: isShow})
  }

  render() {
    const {score, dispatch} = this.props;
    const {LineFire} = this.props.queryresult;
    const {isShow, MajorDetail} = this.props.schooldetails;
    let opt = {
      distance: 16, // 每次移动的距离，卡片的真实宽度
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
    let Y;
    switch (this.state.index) {
      case 0:
        Y = 0;
        break;
      case 1:
        Y = 1.76;
        break;
    };
    switch (isShow){
      case 'info':
        Y = 0;
        break;
      case 'list':
        Y = 1.76;
        break;
    }
    let md;
    // if (MajorDetail) {
    //   if (MajorDetail.data.S == '1') {
    //     md = MajorDetail.data.pList.map((item, index) => {
    //       return <div key={index} style={{paddingTop:'.1rem'}}>
    //         {/*<li>院校类型: <span>&nbsp;{item.schooltype}</span></li>*/}
    //         {/*<li>邮箱: <span>&nbsp;{item.email}</span></li>*/}
    //         {/*<li>地址: <span>&nbsp;{item.address}</span></li>*/}
    //         {/*<li>电话: <span>&nbsp;{item.phone}</span></li>*/}
    //         <h3>专业介绍</h3>
    //         <p style={{lineHeight:'.3rem'}} dangerouslySetInnerHTML={{__html: item.intro}}></p>
    //       </div>
    //     })
    //   }
    // }
    return (
      <div className={classNames('clearfix', styles.SchoolML)}>
        <div className={classNames(styles.pushList, 'clearfix')}>
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
        {/*<div className='bigBtn' onClick={() => {*/}
          {/*this.query()*/}
        {/*}}><button>专业介绍</button>*/}
        {/*</div>*/}
        <div className={styles.VcatMainBox}>
          {/*<ul className={classNames(styles.xuanze, "clearfix")}>*/}
            {/*<ReactSwipe className={classNames(styles.xuanze, "clearfix")} options={opt}>*/}
              {/*<li className={styles.active} onClick={() => {*/}
                {/*this.setState({index: 0}), this.show('info')*/}
              {/*}}>院校专业*/}
              {/*</li>*/}
              {/*<li className={styles.active} onClick={() => {*/}
                {/*this.setState({index: 1}), this.show('list')*/}
              {/*}}>专业详情*/}
              {/*</li>*/}
              {/*<span style={{transform: `translateX(${Y}rem)`}}></span>*/}
            {/*</ReactSwipe>*/}
          {/*</ul>*/}
          <div style={{display: isShow == 'info' ? 'block' : 'none'}}>
            <Specialty {...this.props}></Specialty>
          </div>
          {/*<div style={{display: isShow == 'list' ? 'block' : 'none'}}>*/}
            {/*{md}*/}
          {/*</div>*/}
        </div>
        <Select {...this.props} />
      </div>
    )
  }
}
