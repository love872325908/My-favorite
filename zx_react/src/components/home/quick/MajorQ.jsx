/**
 * 搜专业首页
 */
import React, {Component} from 'react';
import styles from '../Home.less';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';
export default class MajorQ extends Component{
   constructor(props) {
    super(props);
    this.sendOption = this.sendOption.bind(this);
    this.query = this.query.bind(this);
  }
  sendOption(val){
    const { dispatch,score } = this.props;
     if(val == 'min'){
      if(score.professional == '请选择'){
        dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请先选择大类'}});
        return false;
      }
      console.log(score)
    }
    dispatch({type:'getRegion/showPicker',payload:true })
    dispatch({type:'score/selectOption',payload:val })
  }
  query(){
    const{ dispatch ,score,history} = this.props;
    let min;

    if(score.min == '请选择'){
       dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请选择'}})

    }else{
      dispatch({type:'home/targetUrl',payload:'/home/majorq'})
      dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc,professional:score.min}})
      history.push(`/score/major`)

    }

  }
  render(){
     console.log(this.props.searchmajor)
     const { score }  = this.props;
     console.log(score.min)
    return(
       <div className={classNames(styles.select,'clearfix')} >
        <div className={styles.opt_one}>
            <div className={styles.left}>
            <span style={{paddingRight: '.085rem'}}>专业大类</span>
          </div>
            <div className={styles.left}  onClick={()=>this.sendOption('professional')}>
              <div></div>
              <p> {score.professional}</p>
            </div>
          </div>

         <div className={styles.opt_thr}  style={{float: 'right'}}>
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>专业小类</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('min')}>
              <div></div>
             <p> {score.min}  </p>
            </div>
           </div>
            {/*<div className={styles.opt_thr}>
              <div className={styles.left}>
                <span>搜索专业</span>
              </div>
              <div className={styles.left} onClick={()=>this.sendOption('pc')}>
                <div></div>
              <input type="text" value={score.pc}  readOnly />
              </div>
            </div>*/}
            <div className={styles.btn}>
              <button onClick={()=>this.query()}>确认查询</button>
            </div>
      </div>
    )
  }
}
