import React from 'react';
import { Route, Link } from 'dva/router';
import List from './List';
import styles from './Home.less';
import Btn from '../common/Btn';
import classNames from 'classnames';
import ReactSwipe from 'react-swipes';
import Select from '../common/Select';
import Toast from '../common/Toast';
import Load from '../common/Loading';
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { type: 0, show: 1, index: 0, left: 0 };
    this.offset = this.offset.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({ type: 'getSchoolByType', payload: this.state.type });
    dispatch({type: 'getMajorType', payload: {action: ''}});
    console.log('test');
  }

  offset(index) {
    this.setState({ left: index })
  }

  onClickType = (type) => {
    const { dispatch,location } = this.props;
    this.setState({ type });
    dispatch({ type: 'getSchoolByType', payload: type });
  }

  render() {
    const { history , score,location,route} = this.props;
    let opt = {
      distance: 9, // 每次移动的距离，卡片的真实宽度
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
     let list, option, data, Y;
    let arr = [['搜大学','/home/select'], ['搜专业','/home/majorl'], ['大学分数线','/home/school'], ['专业分数线','/home/majorq'], ['地区分数线','/home/city']];
    list = arr.map((item, index) => {
    return <div className={this.state.index == index ? styles.active : ''} key={index} onClick={() => { this.offset(index); this.setState({ index: index }) }}>
         <Link to={item[1]} activeStyle={{color:'#323232'}}>{item[0]}</Link>
         </div>
      })
    var left = this.state.left
     switch (location.pathname) {
      case '/home/select': Y=0; break;
      case '/home/majorl': Y = .6; break;
      case '/home/school': Y = 1.32; break;
      case '/home/majorq': Y = 2.16; break;
      case '/home/city': Y = 3.0; break;

    }

    return (
      <div className={styles.home}>
        <Load {...this.props}/>
        <Toast {...this.props}/>
        <Btn {...this.props}/>
        <img className={styles.banner} src={require('../../assets/images/banner.png')} alt="" />
        {/*选项*/}
        <div className={styles.option}>
          <ul className={classNames(styles.box, 'clearfix')}>
            <li>
              <div className={styles.fenge} onClick={() => history.push('/select')}>
                <div className={styles.svg}>
                  <svg className="icon" aria-hidden="true" >
                    <use xlinkHref="#icon-tiaoxuexiao"></use>
                  </svg>
                  <svg className="icon" aria-hidden="true" >
                    <use xlinkHref="#icon-icon_hot"></use>
                  </svg>
                </div>
                <h2>挑大学</h2>
                <p>各种名校任您挑选</p>
              </div>
            </li>
            <li>
              <div className={styles.fenge2} onClick={() => history.push('/searchmajor')}>
                <div className={styles.svg}  style={{ marginBottom: '.065rem'}}>
                  <svg className="icon" aria-hidden="true" style={{height: '.44rem',marginTop: '-.02rem'}}>
                    <use xlinkHref="#icon-xuanzhuanye"></use>
                  </svg>
                </div>
                <h2>选专业</h2>
                <p>千种专业应有尽有</p>
              </div>
            </li>
            <li>
              <div onClick={() => history.push('/score/school')}>
                <div className={styles.svg}>
                  <svg className="icon" aria-hidden="true" >
                    <use xlinkHref="#icon-fenshuxian"></use>
                  </svg>
                </div>
                <h2>分数线</h2>
                <p>各科分数线一览无遗</p>
              </div>
            </li>
          </ul>
        </div>
        {/*搜索*/}
        <div className={styles.search}>
          <div className={styles.title}>
            <div className={styles.font}>
              <span></span>
              <img src={require('../../assets/images/search.png')} />
              <span></span>
            </div>
            <div className={styles.main}>
              <div className={styles.head}>
                <ReactSwipe className={classNames(styles.swiper, "clearfix")} options={opt}>
                  {list}
                  <span style={{ transform: `translateX(${Y}rem)` }}></span>
                </ReactSwipe>
              </div>
            </div>
            <div  className={styles.bigbox} >
              {this.props.children}
            </div>
          </div>

          {/*热门学校*/}
          <div className={classNames(styles.tip, 'clearfix')}>
              <h3>热门大学</h3>

            </div>
          <div className={classNames(styles.hot)}>

            <List {...this.props}/>
          </div>
            <Select {...this.props}/>
          {/*<div className={classNames(styles.news)}>
            <div className={classNames(styles.titles, 'clearfix')}>
              <div style={{ width: ' 95%' }}>
                <h3>院校资讯</h3>

              </div>
            </div>
            <ul>
              <li className='clearfix'>
                <div className={styles.info}>

                  <h4>
                    <svg className="icon" aria-hidden="true" >
                      <use xlinkHref="#icon-icon_hot"></use>
                    </svg>
                    2017年中级会计师《会计实务》考试大纲
                  </h4>
                  <p className='clearfix'>
                    <span>来源：考试资料网</span>
                    <i>2017-6-12</i>
                  </p>
                </div>
              </li>
            </ul>
          </div>*/}
        </div>
      </div>
    )
  }

}
