/**
 * 大学分数线首页
 */
import React, {Component} from 'react';
import styles from '../Home.less';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';

export default class CityQ extends Component{
   constructor(props) {
    super(props);
    this.sendOption = this.sendOption.bind(this);
    this.query = this.query.bind(this);
  }
    sendOption(val){
    const { dispatch } = this.props;
    dispatch({type:'getRegion/showPicker',payload:true })
    dispatch({type:'score/selectOption',payload:val })
  }
  query(){
    const{ dispatch ,score,history} = this.props;

    dispatch({type:'home/targetUrl',payload:'/home/school'})
     history.push('/score/school')
    dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc}})
  }
  render(){
     const { score }  = this.props;

    return(
       <div className={classNames(styles.select,'clearfix')} >

        <div className={styles.opt_one}>
            <div className={styles.left}>
            <span style={{paddingRight: '.085rem'}}>考生所在地</span>
          </div>
            <div className={styles.left}  onClick={()=>this.sendOption('province')}>
              <div></div>
              <p>{score.province}  </p>
            </div>
          </div>

         <div className={styles.opt_two}  >
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>院校层次</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('pc')}>
              <div></div>
             <p>{score.pc}</p>
            </div>
           </div>
            <div className={styles.opt_thr}>
              <div className={styles.left}>
                <span>录取年份</span>
              </div>
              <div className={styles.left} onClick={()=>this.sendOption('year')}>
                <div></div>
              <p>{score.year}  </p>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={()=>this.query()}>确认查询</button>
            </div>
      </div>
    )
  }
}
