import React, {Component} from 'react';
import styles from '../home/Home.less';
import classNames from 'classnames';
export default class More extends Component{
 constructor(props) {
    super(props);
  }



    render(){

      return(

              <div className={styles.more}  >
                <svg className="icon" aria-hidden="true" >
                  <use xlinkHref="#icon-xuanzhuan"></use>
                </svg>
                <a >显示更多</a>
              </div>

      )
    }
  }

