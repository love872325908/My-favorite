/**
 * 专业分数线首页
 */
import React, {Component} from 'react';
import styles from '../Home.less';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';
export default class MajorL extends Component{
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
    const{ dispatch ,score,history,searchmajor} = this.props;
    let Info;
    console.log(score);
    if(score.min == '请选择'){
     dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请选择'}})

    }else{
      dispatch({type:'home/targetUrl',payload:'/home/majorl'})
      history.push(`/searchResult/majormsg?&specialname=${score.min}`)
     console.log(searchmajor.smallMajor)
     searchmajor.smallMajor.smallMajor.data.pList.map((item)=>{
        if(score.min == item.specialname){
          Info = item;
        }
     })
     console.log(Info);
      dispatch({
      type: 'searchmajor/saveMajorInfo',
      payload: {
        Info: Info
      }
    })
      // history.push(`/searchResult/openmajorschool?&specialname=${score.min}`)
    }

    // history.push(`/searchmajor/openmajorschool?&specialname=${specialname}`)
    // dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc}})
  }
  render(){
     const { score }  = this.props;
    return(
       <div className={classNames(styles.select,'clearfix')} >
        <div className={styles.opt_one}>
            <div className={styles.left}>
            <span style={{paddingRight: '.085rem'}}>专业大类</span>
          </div>
            <div className={styles.left}  onClick={()=>this.sendOption('professional')}>
              <div></div>
              <p>{score.professional} </p>
            </div>
          </div>

         <div className={styles.opt_thr}  style={{float: 'right'}}>
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>专业小类</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('min')}>
              <div></div>
             <p>{score.min}   </p>
            </div>
           </div>
            {/*<div className={styles.opt_thr}>
              <div className={styles.left}>
                <span>选择时间</span>
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
