import React, { Component } from 'react';
import Navbar from '../common/Navbar';
import styles from './result.less';
import ReactSwipe from 'react-swipes';
import classNames from 'classnames';
import Toast from '../common/Toast';
import { Link } from 'dva/router';
export default class Result extends Component {
  constructor(props, num) {
    super(props);
    this.num = 0;
  }
  componentDidMount() {
    const { dispatch } =this.props;
   var orientation= (window.innerWidth > window.innerHeight) ? "landscape":"portrait";
   console.log(orientation,orientation == 'portrait')
   if(orientation == 'portrait'){
     dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'横屏体验效果更佳哦'}})
   }
  }
  render() {

    let opt = {
      distance: 80, // 每次移动的距离，卡片的真实宽度
      currentPoint: 0,// 初始位置，默认从0即第一个元素开始



    }
    let head, body; var num;
    const { history } = this.props;
    const { Contrast } = this.props.getRegion;

    if (Contrast.length > 0) {
      head = Contrast.map((item, i) => {
        return <div className={styles.school} key={i}>
          <div>
            <img src={item.Logo ? item.Logo : require('../../assets/images/none.png')} />
            <span>{item.schoolname}</span>
          </div>
        </div>
      })
      body = Contrast.map((item, i) => {
        this.num = item.DoctorStation
        if (this.num < item.DoctorStation) {
          console.log(item)
        }
        return <ul key={i}>
          <li>{item.schoolproperty ? item.schoolproperty : '暂无'}</li>
          <li>{item.City ? item.City : '暂无'}</li>
          <li className={item.f211 == 1 ? styles.active : ''}>{item.f211 == 1 ? '是' : '否'}</li>
          <li className={item.f985 == 1 ? styles.active : ''}>{item.f985 == 1 ? '是' : '否'}</li>
          <li className={item.membership == '教育部' ? styles.active : ''} style={{ paddingTop: item.membership.length > 8 ? '.04rem' : '.11rem', paddingBottom: item.membership.length > 8 ? 0 : '.11rem' }}>{item.membership}</li>
          <li className={item.DoctorStation > 0 ? classNames(styles.active, styles.details) : styles.details}>{item.DoctorStation > 0 ? `${item.DoctorStation}个` : '--'}</li>
          <li className={item.KeySubject > 0 ? classNames(styles.active, styles.details) : styles.details} style={{ paddingTop: item.KeySubject.length > 8 ? '.04rem' : '.11rem' }}>{item.KeySubject > 0 ? `${item.KeySubject}个` : '--'}</li>
          <li ><Link to={`/schooldetails?&ID=${item.ID}`}>查看详情</Link></li>
          <li><a href={item.guanwang} target="_blank">进入</a></li>
          <li className={styles.power}>{item.shoufei}</li>
        </ul>
      })
    }else{
      history.push('/compete');
    }
    console.log(this.props)
    return (
      <div>
        <Toast {...this.props}/>
        <Navbar title='院校对比' back="compete" {...this.props} />
        <div className={classNames(styles.marg, 'clearfix')}>
          <div style={{ width: '300%' }}>
            <div className={styles.left}>
              <div className={styles.img}>
                <img src={require('../../assets/images/duijue.png')} />
              </div>
              <div className={styles.title}>
                <h4>综合参数</h4>
              </div>
              <div className={styles.option}>
                <ul>
                  <li>类型</li>
                  <li>所在地</li>
                  <li>是否211</li>
                  <li>是否985</li>
                  <li>院校隶属</li>

                  <li>设立博士点</li>
                  <li>国家重点学科</li>
                  <li>学校简介</li>
                  <li>学校网址</li>
                  <li className={styles.end}>收费标准</li>
                </ul>
              </div>
            </div>
            <div className={styles.right}>
              <ReactSwipe className={classNames(styles.head, 'clearfix')} options={opt}>

                {Contrast.length != 0 ? head : <span></span>}

                <div className={styles.school} onClick={() => history.push('/city')} style={{ padding: '.43rem 0', width: '.9rem', border: 'none' }}>
                  <svg className="icon" aria-hidden="true" >
                    <use xlinkHref="#icon-tianjia"></use>
                  </svg>
                </div>
              </ReactSwipe>
              <div className={styles.fenge}></div>
              <div className={classNames(styles.option)}>
                <ReactSwipe className={classNames(styles.info, 'clearfix')} options={opt}>

                  {Contrast.length != 0 ? body : <span></span>}

                </ReactSwipe>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
