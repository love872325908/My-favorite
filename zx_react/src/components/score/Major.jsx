import React, {Component} from 'react';
import styles from '../home/Home.less';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';
import More from '../common/More';
var arr =[];
export default class Major extends Component{
 constructor(props) {
    super(props);
    this.state= {index:1,off:true};
    this.sendOption = this.sendOption.bind(this);
    this.query = this.query.bind(this);
    this.more = this.more.bind(this);
  }
  sendOption(val){
    const { dispatch,score } = this.props;
    if(val == 'min' && score.professional =='请选择'){
    dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请先选择大类'}})
     return false;
    }
    dispatch({type:'getRegion/showPicker',payload:true })
    dispatch({type:'score/selectOption',payload:val })
  }
  query(){
    const{ dispatch ,score} = this.props;
    this.setState({off:false});
    console.log(score.min)
    if(score.min=='请选择'){
      dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请选择专业'}})
      return false;
    }
    dispatch({type:'score/Specialname',payload:{specName:score.min}})
    //dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc,professional:score.min}})
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
   componentDidMount(){

     const { history,dispatch,score } = this.props;
    // 某些清空下数组未清空
    this.query();
    console.log(this.props)
    dispatch({type:'score/Specialname',payload:{specName:'安全工程'}})
  }

    render(){
    const { history } = this.props;
    const { score,getSchool,dispatch } = this.props;
    let listItem,page,school,scoreList;
    // if(!this.state.off){
    //      arr.length = 0
    //   }

      if(score.specName && score.MajorLine){

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
       console.log('进来了',score.Specialname)
        if(score.Specialname.data.S ==1){
          score.Specialname.data.SchoolList.map((item)=>{
            arr.push(item)
          })
          console.log(arr.quChong())
        page = score.Specialname.data.PageCount;
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
      return(
    <div>
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
           <div className={styles.opt_two}  >
            <div className={styles.left}  >
            <span style={{paddingRight: '.095rem'}}>专业小类</span>
            </div>
            <div className={styles.right} onClick={()=>this.sendOption('min')}>
              <div></div>
             <p>{score.min}</p>
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


         <div className={styles.opt_one}>
             <div className={styles.left}>
              <span style={{paddingRight: '.085rem'}}>考生所在地</span>
            </div>
              <div className={styles.left}  onClick={()=>this.sendOption('province')}>
                <div></div>
               <p>{score.province}</p>
              </div>
           </div>
           <div className={styles.opt_thr} >
              <div className={styles.left}>
                <span>录取批次</span>
              </div>
              <div className={styles.left} onClick={()=>this.sendOption('pc')}>
                <div></div>
              <p>{score.pc}</p>
              </div>
            </div>

            <div className={styles.opt_one} style={{float:'right'}} >
              <div className={styles.left}>
                <span>年份</span>
              </div>
              <div className={styles.left} onClick={()=>this.sendOption('year')}>
                <div></div>
                <p>{score.year}</p>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={()=>this.query()}>确认查询</button>
            </div>
      </div>
        <div className={classNames(styles.tip, 'clearfix')}>
            <h3>查询结果</h3>
          </div>

        <div className={classNames(styles.hot)}>
          <div className={styles.list}>
            <ul >


             {listItem}
            <li style={{display:page>1 ? 'block':'none'}} onClick={()=>{this.more()}}>
              <More />
            </li>
            </ul>
        </div>
        </div>
      </div>
      )
    }
  }


