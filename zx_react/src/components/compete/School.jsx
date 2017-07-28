import React, {Component} from 'react';
import styles from '../home/Home.less';
import classNames from 'classnames';
import st from './compete.less';
import More from '../common/More';
import {GetRequest} from '../../services/service.js'
import { Route, Link } from 'dva/router';
import Btn from '../common/Btn'
import Toast from '../common/Toast';
import Load from '../common/Loading';

export default class School extends Component{
 constructor(props,arr,page,index) {
    super(props);
    this.arr =[]
    this.state= {index:1,wrap:-1,arr:[],off:true}
    this.sendSchool = this.sendSchool.bind(this);
    this.show = this.show.bind(this);
    this.more = this.more.bind(this);
  }
  sendSchool(item,i){
    const { history,getRegion,dispatch } =this.props;
    this.index =i
    console.log(getRegion.Contrast[getRegion.Contrast.length-1])
    // 如果是重复的就不进行选中了
    if(getRegion.Contrast[getRegion.Contrast.length-1]&& getRegion.Contrast[getRegion.Contrast.length-1].ID == item.ID){
     dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请不要重复选择'}})
     return false;
    }
    if(getRegion.Contrast.length>3){
      dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'只能选择四所学校哦'}})
     return false;
    }
    history.push('/compete');
    dispatch({ type: 'getRegion/addSchool', payload:item });
  }
  show(index){
  console.log(index)
  this.setState({wrap:index});

  if(this.state.wrap == index){
  this.setState({wrap:-1})
  }
}
componentDidMount(){
  this.page = GetRequest().page;
}
  more(){
    const { history } = this.props;

    const { SchoolList } = this.props.getRegion;
    if(GetRequest().page == SchoolList.data.PageCount){
      dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'已经是最后一页了'}})

      return false;
    }


    history.push(`/schoolSel?&page=${parseInt(GetRequest().page)+1}&province=${GetRequest().province}`)
  }
    render(){
      const { history } =this.props;
      let listItem,province,show;
      const { SchoolList } = this.props.getRegion;

      console.log(GetRequest(),this.page)
      if(GetRequest().page == this.page){

      this.arr = [];
      }
      console.log(this.page)
      if(this.props.getRegion.SchoolList.length != 0){
        listItem = '';
      if(SchoolList.data.S == 1){
      //    if(!this.state.off){
      //    arr.length = 0;
      // }

        console.log(SchoolList.data)
        SchoolList.data.SchoolList.map((item)=>
        {
          this.arr.push(item);

        }
        )
        //  arr.quChong();
        console.log(this.arr.quChong())
        listItem = this.arr.quChong().map((item,i)=>{
          province = item.province;
          show = true;
          return <li className='clearfix' key={i} >

              <div className={classNames(styles.border,'clearfix')}>
              <div className='clearfix' onClick={()=>{this.sendSchool(item,i)}}  >
                  <img src={item.Logo? item.Logo:require('../../assets/images/none.png')}/>
                  <span>{item.schoolname}</span>
                </div>
                <div onClick={()=>{this.show(i)}}>
                  <a>{this.state.wrap==i? '收起':'查看详情'}</a>
                </div>

                </div>
                <div style={{overflow:'hidden',height:this.state.wrap==i? 'auto':'0',paddingRight:'.15rem'}}>
                    <div className={classNames(styles.details,'clearfix')}>
                    <p><i>学校所在地：</i><span>{item.province? item.province : '暂无'}</span></p>
                    <p><i>学院类型：</i><span>{item.schoolproperty? item.schoolproperty : '暂无'}</span></p>
                    <p><i>院校性质：</i><span>{item.schoolnature? item.schoolnature : '暂无'}</span></p>
                    <p><i>院校代码：</i><span>{item.schoolcode? item.schoolcode : '暂无'}</span></p>

                  </div>
                </div>

              </li>
        })}
        else{
          listItem= <li className='clearfix' >
                  <svg className="icon" aria-hidden="true" style={{width:'100%',height:'1rem'}} >
                    <use xlinkHref="#icon-zanwuneirong-"></use>
                  </svg>
                  <strong>暂无数据</strong>
                   </li>;

        }
      }
      return(
      <div>
        <Load {...this.props}/>
        <Btn {...this.props}/>
        <Toast {...this.props}/>
        <div className={st.box}>
          <div className={st.navbar} onClick={()=>history.push('/city')}>&times;</div>
         {province}
        </div>
        <div className={styles.top}>
         <div className={classNames(styles.hot)}  style={{marginTop:'0'}}>
          <div className={styles.list} style={{marginTop:'0'}}>
            <ul >
              {listItem}
              {/*<div className={styles.more} onClick={()=>this.more()}>
                <svg className="icon" aria-hidden="true" >
                  <use xlinkHref="#icon-xuanzhuan"></use>
                </svg>
                <a >显示更多</a>
              </div>*/}
              <li  onClick={()=>this.more()} style={{display:show? 'block':'none'}}>
              <More />
              </li>
            </ul>
        </div>
        </div>
      </div>
    </div>
      )
    }
  }

