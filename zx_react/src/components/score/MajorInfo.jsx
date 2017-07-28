import React, {Component} from 'react';
import styles from '../home/Home.less';
import classNames from 'classnames';
import Navbar from '../common/Navbar';
import { Route, Link } from 'dva/router';
import More from '../common/More';
import Toast from '../common/Toast';
import Load from '../common/Loading';
var arr =[];
export default class MajorInfo extends Component{
 constructor(props) {
    super(props);
    this.state={id:1,wrap:-1,}
    this.more = this.more.bind(this);
  }

  show(index,id){
    const { dispatch,score } = this.props;
    console.log(id)
    this.setState({id:id});
    this.setState({wrap:index})

  if(this.state.wrap == index){
    this.setState({wrap:-1});
    return false;
    }
  dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc,ID:id,professional:score.specName,info:true}})

}
 more(){
    const { history,dispatch,score } = this.props;
    if(score.Specialname.data.CurrentPage == score.Specialname.data.PageCount){
        dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'已经是最后一页了'}})
       return false;
    }
    console.log(score)
    // dispatch({type:'score/Specialname',payload:{specName:item.specialname,page:1}})
    dispatch({type:'score/Specialname',payload:{specName:score.specName,
      page:parseInt(score.Specialname.data.CurrentPage)+1}})
  }
    render(){
      let listItem,scoreList,more=false;

      const { dispatch , score} = this.props;
      if(score.specName && score.MajorLine){
        console.log(1,score.MajorLine.data.sList)
      if(score.MajorLine.data.S == 1 && score.MajorLine.data.sList.length==1)
       {
       console.log(score.MajorLine.data.sList)
       scoreList  =  score.MajorLine.data.sList.map((item,i)=>{
        return  <div style={{overflow:'hidden',paddingRight:'.15rem'}} key={i}>
                  <div className={classNames(styles.details,'clearfix')}>
                    <p><i>考生所在地：</i><span>{item.province}</span></p>
                    <p><i>考生类别：</i><span>{item.stype}</span></p>
                    <p><i>批次：</i><span>{item.pc}</span></p>
                    <p><i>年份：</i><span>{item.year}</span></p>
                    <p><i>最高：</i><span>{item.maxfs}</span></p>
                  </div>
                </div>
      })
    }else{
      scoreList = <div style={{overflow:'hidden',paddingRight:'.15rem'}} >
                  <div className={classNames(styles.details,'clearfix')}>

                  <svg className="icon" aria-hidden="true" style={{width:'100%',height:'.4rem'}} >
                    <use xlinkHref="#icon-zanwuneirong-"></use>
                  </svg>
                  <strong>暂无数据</strong>

                  </div>
                </div>;
    }}
      if(score.Specialname){
        if(score.Specialname.data.S ==1){
          score.Specialname.data.SchoolList.map((item)=>{
            arr.push(item)
          })
          more =true;
        listItem = arr.quChong().map((item,i)=>{
          return <li className='clearfix' key={i} onClick={()=>{this.show(i,item.ID) }} >
               <div className={classNames(styles.border,'clearfix')}>
                  <div className='clearfix'>
                    <img src={item.Logo? item.Logo :require('../../assets/images/none.png')}/>
                    <span>{item.schoolname}</span>
                  </div>
                  <div>
                    <a >查看详情</a>
                  </div>
                </div>
               <div style={{overflow:'hidden',height:this.state.wrap==i? 'auto':'0' }}>

              {item.ID == this.state.id? scoreList:''}
              </div>
              </li>
        })}else{
         listItem = <li className='clearfix'  >
               <div className={classNames(styles.border,'clearfix')}>
                  <div className='clearfix'>

                    <span>暂无数据</span>
                  </div>
                  <div>

                  </div>
                </div>

              </li>
        }
      }
      console.log(score.specName)
      return(
      <div>
        <Load {...this.props}/>
        <Toast {...this.props}/>
        <Navbar title={score.specName} />
        <div className={classNames(styles.hot,styles.marg)}>
          <div className={styles.list}>
            <ul>
              {listItem}
              <li style={{display:more ? 'block':'none'}} onClick={()=>{this.more()}}>
              <More />
            </li>
            </ul>
        </div>
        </div>
      </div>
      )
    }
  }
