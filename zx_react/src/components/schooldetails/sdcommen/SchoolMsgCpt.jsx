import React, {Component} from 'react'
import styles from '../Home.less'
import classNames from 'classnames'
export default class extends React.Component {
  render() {
    const {QSInfo} = this.props.schooldetails;
    let Listitem;
    if (QSInfo.QSInfo && QSInfo.QSInfo.data != undefined) {
      Listitem = QSInfo.QSInfo.data.SchoolList.map((item, index) => {
        return <div key={index} className={classNames(styles.schoolMsgBox, 'clearfix')}>
          <div className={classNames(styles.msgImgBox)}>
            <img src={item.Logo ? item.Logo : require('../../../assets/images/none.png')}/>
          </div>
          <div className={classNames(styles.schoolNameBox)}>
            <h3>{item.schoolname}</h3>
            <div>
              <span>{item.f985 == '1' ? '985高校、' : ''}</span>
              <span>{item.f211 == '1' ? '211高校、' : ''}</span>
              <span>{item.membership}直属</span>
            </div>
          </div>
        </div>
      })
    }else{
      Listitem = ''
    }
    return (
      <div>
        {Listitem}
      </div>
    )
  }
}
