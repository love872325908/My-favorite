import React, {Component} from 'react';
import styles from '../home/Home.less';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';
import Load from '../common/Loading';
export default class Batch extends Component{
 constructor(props) {
    super(props);
    this.sendOption = this.sendOption.bind(this);
    this.query = this.query.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
    sendOption(val){
    const { dispatch } = this.props;
    dispatch({type:'getRegion/showPicker',payload:true })
    dispatch({type:'score/selectOption',payload:val })
    dispatch({type:'score/changeOption',payload:val})
  }
    query(){
    const{ dispatch ,score,history} = this.props;

    if(score.province == '不限'){
      dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'已经是最后一页了'}})

      return false;
    }
    history.push('/batchInfo');

    dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc,grade:true}})
    }
    handleClick(id){
      const { dispatch ,score, history} = this.props;
      history.push('/batchInfo');
      console.log(id)
      dispatch({type:'score/changeProvince',payload:id})
      dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:id,pc:score.pc,grade:true}})
    }
    render(){
      const { score,getSchool,dispatch ,history} = this.props;
       let listItem;
    if(score.CityList){
       listItem = score.CityList.data.pList.map((item,i)=>{
         if(item.ProvinceName != '不限'){
          return  <li key={i} className='clearfix' onClick={()=>this.handleClick(item.ProvinceName)}>
               <div className={classNames(styles.border,'clearfix')}>
                  <div className='clearfix'>

                    <span className={styles.school_name}>{item.ProvinceName}</span>
                  </div>
                  <div>
                    <a>查看详情</a>
                  </div>
                </div>
              </li>
         }
        })
    }

      return(
        <div>
          <Load {...this.props}/>
        <div className={classNames(styles.select,'clearfix')} >
           <div className={styles.opt_two}  >
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>文理分科</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('wl')}>
              <div></div>
             <p> {score.Wl} </p>
            </div>
           </div>
          <div className={styles.opt_one}>
            <div className={styles.left}>
               <span>年份</span>
            </div>
            <div className={styles.left} onClick={()=>this.sendOption('year')}>
              <div></div>
               <p>{score.year} </p>
            </div>
          </div>
          <div className={styles.opt_one}>
             <div className={styles.left}>
              <span style={{paddingRight: '.085rem'}}>考生所在地</span>
            </div>
              <div className={styles.left}  onClick={()=>this.sendOption('province')}>
                <div></div>
               <p>{score.province}  </p>
              </div>
           </div>
          <div className={styles.opt_thr} style={{float:'right'}}>
            <div className={styles.left}>
              <span>录取批次</span>
            </div>
            <div className={styles.left} onClick={()=>this.sendOption('pc')}>
              <div></div>
             <p>{score.pc} </p>
            </div>
          </div>
          <div className={styles.btn}>
             <button onClick={()=>this.query()}>确认查询</button>
          </div>
          </div>

          <div className={classNames(styles.tip, 'clearfix')}>
            <h3>热门地区</h3>
          </div>
        <div className={classNames(styles.hot)}>
          <div className={styles.list}>
            <ul >
              {listItem}

            </ul>
        </div>
        </div>
      </div>
      )
    }
  }

