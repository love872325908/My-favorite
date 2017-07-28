import React, {Component} from 'react';
import styles from './Toast.less';
export default class Toast extends Component{
 constructor(props) {
    super(props);
  }
  componentDidMount(){
    const { dispatch } = this.props;


          dispatch({type:'getRegion/toggleShow',payload:{open:false }})


  }
    render(){
      const { dispatch } = this.props;
      if(this.props.getRegion.open){
        setTimeout(()=>{
          dispatch({type:'getRegion/toggleShow',payload:{open:false }})
        },1000)
      }
      return(

              <div className={styles.toast} style={{display:this.props.getRegion.open? 'flex':'none'}} >
                <div>
                    {this.props.getRegion.info}
                </div>
              </div>

      )
    }
  }

