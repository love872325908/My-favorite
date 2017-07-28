import React, {Component} from 'react';
import { Route } from 'dva/router';
import styles from './Home.less';
import classNames from 'classnames';
import Navbar from '../common/Navbar';
import Btn from '../common/Btn';
import Select from '../common/Select';
import More from '../common/More';
import {  Link } from 'dva/router';
import Toast from '../common/Toast';
import Load from '../common/Loading';
var arr =[];
export default class Pick extends Component {
  constructor(props) {
    super(props);
    this.state= {index:1,wrap:-1,name:'热门大学',off:true}
    this.sendOption = this.sendOption.bind(this);
    this.query = this.query.bind(this);
    this.show = this.show.bind(this);
    this.more = this.more.bind(this);
  }
  sendOption(val){
    const { dispatch } = this.props;

    dispatch({type:'getRegion/showPicker',payload:true })
    dispatch({type:'score/selectOption',payload:val })
  }
  more(){
    const { history,dispatch,score } = this.props;
    const { SchoolList } = this.props.getRegion;
    this.setState({off:true})
    if(score.SchoolName.data.CurrentPage == score.SchoolName.data.PageCount){
      dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'已经是最后一页了'}})

      return false;
    }

    dispatch({type:'score/GetSchooList',payload:{province:score.province,page:parseInt(score.SchoolName.data.CurrentPage)+1,schoolType:score.schoolType}})

  }
  componentDidMount(){
    arr = [];
  }
  query(){
    const{ dispatch ,score} = this.props;
    let ID;
    this.setState({off:false});
    dispatch({type:'score/GetSchooList',payload:{province:score.province,schoolType:score.schoolType}})
    }
  show(index){
    this.setState({wrap:index})
    if(this.state.wrap == index){
    this.setState({wrap:-1})
    }
  }
  render() {
    const { score ,getRegion, dispatch, history} = this.props;
    let listItem,hot=true,page;
    if(getRegion.HotSchool){
      hot = true;
      listItem = getRegion.HotSchool.data.SchoolList.map((item,i)=>{
         return  <li className='clearfix' key={i} onClick={()=>{this.show(i);history.push(`/schooldetails?&ID=${item.ID}`);dispatch({type:'home/targetUrl',payload:'/select'})}}>
               <div className={classNames(styles.border,'clearfix')}>
                  <div className='clearfix'>
                    <img src={item.Logo? item.Logo:require('../../assets/images/none.png')}/>
                    <span>{item.schoolname}</span>
                  </div>
                  <div >
                    <a>查看详情</a>
                  </div>
                </div>

              </li>
      })
    }

    if(score.SchoolName && score.SchoolName.data.S==1  ){
      if(!this.state.off){
         arr.length = 0
      }
      page = score.SchoolName.data.PageCount;
      console.log(arr)
       score.SchoolName.data.SchoolList.map((item)=>{
        // arr.length=0
        arr.push(item);
      })
      hot = false;
      // console.log(arr.quChong())
      listItem = arr.quChong().map((item,i)=>{
          return  <li className='clearfix' key={i}>
               <div className={classNames(styles.border,'clearfix')} onClick={()=>{history.push(`/schooldetails?&ID=${item.ID}`);dispatch({type:'home/targetUrl',payload:'/select'})}} >
                  <div className='clearfix' >
                    <img src={item.Logo? item.Logo:require('../../assets/images/none.png')}/>
                    <span>{item.schoolname}</span>
                  </div>
                  <div >
                    <a >查看详情</a>
                  </div>
                </div>
              {/*<div style={{overflow:'hidden',height:this.state.wrap==i? 'auto':'0',paddingRight:'.15rem'}}>
                  <div className={classNames(styles.details,'clearfix')}>
                    <p><i>考生所在地：</i><span>{item.province? item.province:'暂无'}</span></p>
                    <p><i>考生类别：</i><span>{item.stype? item.stype:'暂无'}</span></p>
                    <p><i>批次：</i><span>{item.pc? item.pc:'暂无'}</span></p>
                    <p><i>年份：</i><span>{item.year? item.year:'暂无'}</span></p>
                    <p><i>平均分：</i><span>{item.varfs? item.varfs:'暂无'}</span></p>
                  </div>
                </div>*/}
              </li>

        })
    }
    else if(score.SchoolName && score.SchoolName.data.S == 0){
      listItem = <li >
                  <svg className="icon" aria-hidden="true" style={{width:'100%',height:'1rem'}} >
                    <use xlinkHref="#icon-zanwuneirong-"></use>
                  </svg>
                  <strong>暂无数据</strong>
                 </li>
      // hot =false;
    }

    return (
      <div >
        <Load {...this.props}/>
        <Select {...this.props}/>
        <Toast  {...this.props}/>
        <Navbar title='挑大学'  back='home/select'  {...this.props}/>
        <div className={classNames(styles.wrap, styles.marg)}>
          <div className={classNames(styles.select, 'clearfix')} style={{padding:'.2rem 0 0 0'}}>
            <div className={styles.opt_two}>
              <div className={styles.left}>
                <span>学校类型</span>
              </div>
              <div className={styles.left} onClick={()=>this.sendOption('schoolType')}>
              <div></div>
             <p>{score.schoolType} </p>
            </div>
            </div>

            <div className={styles.opt_one}>
             <div className={styles.left}>
              <span style={{paddingRight: '.085rem'}}>学校所在地</span>
              </div>
              <div className={styles.left}  onClick={()=>this.sendOption('province')}>
                <div></div>
                <p> {score.province}   </p>
              </div>
            </div>


            <div className={styles.btn}>
              <button onClick={()=>this.query()} style={{marginTop:'.1rem'}}>确认查询</button>
            </div>
          </div>
        </div>
        <div className={classNames(styles.tip, 'clearfix')}>
            <h3>{hot ? '热门大学':'查询结果'}</h3>
          </div>
        <div className={classNames(styles.hot)}>


          <div className={styles.list}>
            <ul >
              {listItem}
            <li style={{display:  page >1? 'block':'none',marginTop:0}}
                onClick={()=>{this.more()}}
              >
                <More  />
              </li>
            </ul>
          </div>
        </div>

      </div>
    )
  }
}
