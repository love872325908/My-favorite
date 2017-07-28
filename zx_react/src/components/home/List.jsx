import React from 'react';
import classNames from 'classnames';
import styles from './Home.less';
import {  Link } from 'dva/router';
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { type, dispatch } = this.props;
    console.log(this.props);
  }

  render() {
    console.log(this.props)
    const { history,dispatch } = this.props;
    const {HotSchool} = this.props.getRegion;
    let listItem;
    if(HotSchool){
      listItem = HotSchool.data.SchoolList.map((item,i)=>{
        return <li className='clearfix' key={i}>
          <div className={classNames(styles.border, 'clearfix')} onClick={()=>{history.push(`/schooldetails?&ID=${item.ID}`);dispatch({type:'home/targetUrl',payload:'/home'})}}>
            <div className='clearfix'>
              <img src={item.Logo? item.Logo:require('../../assets/images/none.png')}/>
              <span>{item.schoolname}</span>
            </div>
            <div>
              <a to={`/schooldetails?&ID=${item.ID}`}>查看详情</a>
            </div>
          </div>
        </li>
      })
    }
    return (<div className={styles.list}>
      <ul>
        {listItem}
      </ul>

    </div>)
  }
}
