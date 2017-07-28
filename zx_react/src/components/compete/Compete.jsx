import React, {Component} from 'react';
import classNames from 'classnames';
import styles from './compete.less';
import ReactSwipe from 'react-swipes';
import Btn from '../common/Btn';
import Toast from '../common/Toast';
export default class Compete extends Component{
 constructor(props) {
    super(props);
    this.state = {btn:'添加一个',left:150}
    this.sendSchool = this.sendSchool.bind(this);
    this.contrast = this.contrast.bind(this);
  }
   sendSchool(i){
    const { dispatch } = this.props;
    this.setState({left:0})
    dispatch({ type: 'getRegion/delSchool', payload:i });
  }
  contrast(){
    const { dispatch,history } = this.props;
    const { Contrast } = this.props.getRegion;
    console.log(Contrast.length>1,'----------------')
    history.push('/city')
    if(Contrast.length >1){
     console.log('可以对比了')
      history.push('/result')
    }

    // if(Contrast.length == 0){
    //   dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'请选择学校'}});
    //   return false;
    // }
    // history.push('/result')
  }
    render(){
    let opt = {
      distance: 150,
      currentPoint:-1,
    }
    let list,name='添加一个';
    const { history,dispatch } = this.props;
    const { Contrast } = this.props.getRegion;

  if(Contrast.length != 0){
    if(Contrast.length>1){
      name = '开始对比';
    }
    list = Contrast.map((item,i)=>{
      console.log(opt.distance=150)
      return   <ReactSwipe style={{transform: 'translate3d(0px, 0px, 0px)'}}  className={classNames(styles.body,"clearfix")} key={i} options={opt}>
        <div className={classNames(styles.list,"clearfix")}>
        <div style={{display:'flex',alignItems:'center'}}>
          {/*<svg className="icon" aria-hidden="true" style={{fill:'#fff'}}>
                <use xlinkHref="#icon-yuan"></use>
              </svg>*/}
          <img src={item.Logo? item.Logo : require('../../assets/images/none.png')} style={{marginLeft:'.08rem'}}/>
        </div>
            <div className={styles.text}>
              <h4>{item.schoolname}</h4>
               <p>
                <span>{item.f985 == 1?'955高校 ':''}</span>
                <span>{item.f211 == 1?'211高校 ':''}</span>
                <span>{item.membership}直属</span>
               </p>
            </div>
            </div>
            <div className={classNames(styles.btns,'clearfix')}>
              <div style={{background:'#4b97ff'}} onClick={()=>history.push('/city')}>换一个</div>
              <div style={{background:'#ff3a31'}} onClick={()=>{this.sendSchool(i)}}>删除</div>
            </div>
          </ReactSwipe>
        })
      }
      return(
      <div >
        <Toast {...this.props}/>
        <div className={styles.banner}>
          <span onClick={()=>history.push('/')}>
            <svg className="icon" aria-hidden="true" style={{fill:'#fff'}}>
              <use xlinkHref="#icon-cuowu1"></use>
            </svg>
          </span>
          <img src={require('../../assets/images/vs.png')}/>
        </div>
        <div className={styles.school}>
            {list}

          <div className={styles.add} style={{display:Contrast.length>1 && Contrast.length<4? 'block':'none'}} onClick={()=>history.push('/city')}>添加一个</div>
        </div>
        <div className={styles.btn} style={{position: Contrast.length>3? 'fixed':'relative',bottom: '0',width: '100%',paddingTop:0,height:'.9rem'}}>
          <button onClick={()=>this.contrast()}>{name}</button>
        </div>
      </div>
      )
    }
  }

