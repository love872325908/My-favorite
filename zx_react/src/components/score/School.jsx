import React, {Component} from 'react';
import styles from '../home/Home.less';
import classNames from 'classnames';
import More from '../common/More';
import { Route, Link } from 'dva/router';
var arr =[];
export default class School extends Component{
 constructor(props) {
    super(props);
    this.state= {index:1,wrap:-1,off:true}
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
    show(index){
    this.setState({wrap:index})
    if(this.state.wrap == index){
    this.setState({wrap:-1})
  }
  }
  query(){
    const{ dispatch ,score} = this.props;
    this.setState({off:false});
    console.log(score,'--------------------')
    console.log(score.province)
    dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc}})
  }
   componentDidMount(){
    arr = [];
    // 某些清空下数组未清空
    this.query()
  }

  more(){
    const { history,dispatch,score } = this.props;
    this.setState({off:true})
    if(score.SchoolLine.data.CurrentPage == score.SchoolLine.data.PageCount){
       dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'已经是最后一页了'}})
       return false;
    }
     dispatch({type:'score/GetSchoolLine',payload:{year:score.year,wl:score.Wl,province:score.province,pc:score.pc,page:parseInt(score.SchoolLine.data.CurrentPage)+1}})
  }
    render(){

      const { score,getSchool,dispatch } = this.props;
      let listItem,more=false;

      if(score.SchoolLine){
        if(!this.state.off){
         arr.length = 0
      }

       if( score.SchoolLine.data.S==1){
         score.SchoolLine.data.sList.map((item)=>{
           arr.push(item)
           })
         more =true;
        listItem = arr.quChong().map((item,i)=>{
        return  <li className='clearfix' key={i} onClick={()=>{this.show(i)}}>
               <div className={classNames(styles.border,'clearfix')}>
                  <div className='clearfix'>
                    <img src={item.schoolLogo? item.schoolLogo:require('../../assets/images/none.png')}/>
                    <span>{item.schoolName}</span>
                  </div>
                  <div >
                    <a>{this.state.wrap==i? '收起':'查看详情'}</a>
                  </div>
                </div>
              <div style={{overflow:'hidden',height:this.state.wrap==i? 'auto':'0',paddingRight:'.15rem'}}>
                <div className={classNames(styles.details,'clearfix')}>
                  <p><i>考生所在地：</i><span>{item.province? item.province:'暂无'}</span></p>
                  <p><i>考生类别：</i><span>{item.stype? item.stype:'暂无'}</span></p>
                  <p><i>批次：</i><span>{item.pc? item.pc:'暂无'}</span></p>
                  <p><i>年份：</i><span>{item.year? item.year:'暂无'}</span></p>
                  <p><i>平均分：</i><span>{item.varfs? item.varfs:'暂无'}</span></p>

                </div>
                </div>
              </li>

        })
       }
       else{
          listItem =  <li className='clearfix' >
                  <svg className="icon" aria-hidden="true" style={{width:'100%',height:'1rem'}} >
                    <use xlinkHref="#icon-zanwuneirong-"></use>
                  </svg>
                  <strong>暂无数据</strong>
                   </li>
      }
    }
      return(
        <div>
        <div className={classNames(styles.select,'clearfix')} >
          <div className={styles.opt_two} style={{marginBottom:'.2rem'}}>
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
               <p>{score.year}</p>
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
          <div className={styles.opt_thr} style={{float:'right'}}>
            <div className={styles.left}>
              <span>录取批次</span>
            </div>
            <div className={styles.left} onClick={()=>this.sendOption('pc')}>
              <div></div>
             <p>{score.pc}</p>
            </div>
          </div>
          <div className={styles.btn}>
            <button onClick={()=>this.query()}>确认查询</button>
          </div>
          </div>

        <div className={classNames(styles.tip, 'clearfix')}>
            <h3>查询结果</h3>
          </div>
        <div className={classNames(styles.hot)} >
          <div className={styles.list} style={{ paddingRight:'.15rem'}}>
            <ul >
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

