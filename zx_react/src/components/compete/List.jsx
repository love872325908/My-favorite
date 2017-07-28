import React, {Component} from 'react';
import styles from './compete.less';
import classNames from 'classnames';
import { Route, Link } from 'dva/router';

export default class List extends Component{
 constructor(props) {
    super(props);
    // this.scrollToAnchor= this.scrollToAnchor.bind(this);
  }
  // scrollToAnchor = (anchorName) => {
  //   if (anchorName) {
  //       let anchorElement = document.getElementById(anchorName);
  //       if(anchorElement) { anchorElement.scrollIntoView(); }
  //   }
  // }
    render(){
      const { history } =this.props;
      const { CityList } = this.props.getSchool;
      let list,A,target;

    if(CityList.data){
      list = CityList.data.pList.map((item,index)=>{
      return <li key={index}><Link to={`/schoolSel?&page=1&province=${item.ID}`}>{item.ProvinceName}</Link></li>
    })}

      return(
      <div className={classNames(styles.top)}>

        <div className={styles.city_list}  >
          {/*<h4 className={styles.title} id={`${item.letter}`}>{item.letter}</h4>*/}
          <ul>
            {list}
          </ul>
        </div>
        {/*<ul className={styles.zimu}>
          {target}
        </ul>*/}

      </div>
      )
    }
  }

