/**
 * 地区分数线首页
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
    const { score, dispatch, history } = this.props;
    if(score.province == '不限'){
       dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请选择地区'}})

      return false;
    }
    dispatch({type:'home/targetUrl',payload:'/home/city'})
    history.push('/batchInfo');
    dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc,grade:true}})

  }
  render(){
    const { score }  = this.props;
    return(
       <div className={classNames(styles.select,'clearfix')} >
        <div className={styles.opt_one}>
            <div className={styles.left}>
            <span style={{paddingRight: '.085rem'}}>地区/城市</span>
          </div>
            <div className={styles.left}  onClick={()=>this.sendOption('province')}>
              <div></div>
              <p>{score.province} </p>
            </div>
          </div>

         <div className={styles.opt_two}  >
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>文理分科</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('wl')}>
              <div></div>
             <p>{score.Wl}</p>
            </div>
           </div>
            <div className={styles.opt_thr}>
              <div className={styles.left}>
                <span>选择时间</span>
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
