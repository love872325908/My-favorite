import React, {Component} from 'react';
import styles from '../home/Home.less';

import classNames from 'classnames';
import Navbar from '../common/Navbar';
import { Route, Link } from 'dva/router';
import ReactSwipe from 'react-swipes';
import Load from '../common/Loading';
import {LineChart , XAxis , CartesianGrid , YAxis,Legend ,Line , Tooltip} from 'recharts';
export default class BatchInfo extends Component{
 constructor(props) {
    super(props);
    this.state= {index:0};
    this.query = this.query.bind(this);
  }
  query(year){


    const{ dispatch ,score,history} = this.props;
    if(score.year == year){
      return false;
    }
    dispatch({type:'score/changeYear',payload:year })
    dispatch({type:'score/GetSchoolLine',payload:{year:year,wl:score.Wl,province:score.province,pc:score.pc,grade:true}})
  }
    render(){
      let Y = this.state.index;
      let index=0;
      let listItem,city,year=[],yearList,dataList=[],wenke=[],like=[],arr=[];
      console.log(this.props.score)
      const { score } = this.props;

        year.map((item,i)=>{
          if(score.year == item){
            Y = i;
          }
        })
      for(var i = new Date().getFullYear()-15 ;i<new Date().getFullYear(); i++){
       year.push(i);
       }
      if(score.GradeLine && score.GradeLine.data.S == 1){
        listItem = score.GradeLine.data.GradeLineList.map((item,i)=>{

          return  <li className="clearfix" key={i}>
                  <p><i>考生类别：</i><span>{item.type}</span></p>
                  <p><i>最低分数控制线：</i><span>{item.score}分</span></p>
                  <p><i>批次：</i><span>{item.bath}</span></p>
                </li>
        })
      }else{
        listItem=<li style={{border:'none'}}><svg className="icon" aria-hidden="true" style={{width:'100%',height:'.6rem'}} >
                    <use xlinkHref="#icon-zanwuneirong-"></use>
                  </svg>
                  <strong>暂无数据</strong></li>
      }
      yearList = year.reverse().map((item,i)=>{

        return  <li onClick={()=>{this.setState({index:i})}} key={i}>
                  <a className={this.state.index==i ? styles.active:''}  onClick={()=>this.query(item)}>{item}年</a>
                </li>
      })

        // 18 12 6
         if(score.year>=2012){
          index = 0;
         }
         if(score.year<2012 && score.year>=2007){
           index =8;
         }if(score.year<2007){
           index = 18;
         }

        let opt = {
        distance: 45, // 每次移动的距离，卡片的真实宽度
        currentPoint: index,// 初始位置，默认从0即第一个元素开始
    }
    if(score.HistoryLine && score.HistoryLine.data.S==1){
    score.HistoryLine.data.GradeLineList.map((item,i)=>{
      if(item.type == '文科'){
       dataList.push( {
         year:item.year + '年',
         wenke:parseInt(item.score? item.score:'--'),
       })
      }else{
        arr.push ({
         like:parseInt(item.score? item.score:'--'),
       })
      }
     })
     if(arr){
       arr.map((item,i)=>{
      dataList[i]={
        wenke:dataList[i].wenke,
        like:item.like,
        year:dataList[i].year,
      }
     })
     }
    }

// for(var i=0;i<dataList.length;i++){
//   dataList.push(arr[i])
// }
 console.log(dataList)
      return(
      <div>
        <Load {...this.props}/>
        <Navbar title={this.props.score.province} />
        <div className={classNames(styles.wrap,styles.marg)}>
          <ul className='clearfix' style={{overflow:'hidden'}}>
          <ReactSwipe className={classNames(styles.year,"clearfix")} key={i} options={opt}>

        {yearList}
        <span  style={{transform:`translateX(${Y*.68}rem)`,width:'.68rem'}}></span>
         </ReactSwipe>

        </ul>


        </div>
        <div className={styles.batchList}>
          <ul>
            {listItem}
          </ul>
       <LineChart width={500} style={{display:score.HistoryLine && score.HistoryLine.data.S==1 ? 'block':'none',marginTop:'.2rem'}} className={styles.graph} height={350} data={dataList}>
        <XAxis dataKey="year" reversed='true' />
        <YAxis domain={['dataMin ', 'dataMax ']}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="wenke" name='文科' stroke="#8884d8"  />
        <Line type="monotone" dataKey="like" name='理科' stroke="#82ca9d" />
      </LineChart>
        </div>
      </div>
      )
    }
  }
