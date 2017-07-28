/**
 * 挑大学分数线首页
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
    const { dispatch,score } = this.props;
    console.log(score.schoolType)
    if(val == 'schoolName'){
      dispatch({type:'score/GetSchooList',payload:{province:score.province,schoolType:score.schoolType}})
      dispatch({type:'getRegion/showPicker',payload:true })
      dispatch({type:'score/selectOption',payload:val })

    }else{
      dispatch({type:'getRegion/showPicker',payload:true })
      dispatch({type:'score/selectOption',payload:val })
    }
  }
  query(){
    const{ dispatch ,score, history} = this.props;
    let ID;
    // /schooldetails?&ID=${item.ID}

    if(score.schoolName == '请选择大学'){
      dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请选择大学'}})

      return false;
    }

    score.SchoolName.data.SchoolList.map((item,i)=>{

      if(score.schoolName == item.schoolname){
        dispatch({type:'home/targetUrl',payload:'/home/select'})
        history.push(`/schooldetails?&ID=${item.ID}`)
      }
    })
    }
  render(){
     const { score }  = this.props;
    return(
       <div className={classNames(styles.select,'clearfix')} >
        <div className={styles.opt_one}>
            <div className={styles.left}>
            <span style={{paddingRight: '.085rem'}}>城市/地区</span>
          </div>
            <div className={styles.left}  onClick={()=>this.sendOption('province')}>
              <div></div>
              <p>{score.province}  </p>
            </div>
          </div>

         <div className={styles.opt_two}  >
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>学校类型</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('schoolType')}>
              <div></div>
             <p> {score.schoolType} </p>
            </div>
           </div>
            <div className={styles.opt_thr} >
              <div className={styles.left}>
                <span>学校名称</span>
              </div>
              <div className={styles.left} onClick={()=>this.sendOption('schoolName')}>
                <div></div>
              <p style={{width: '2.15rem'}}>{score.schoolName}   </p>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={()=>this.query()}>确认查询</button>
            </div>
      </div>
    )
  }
}
