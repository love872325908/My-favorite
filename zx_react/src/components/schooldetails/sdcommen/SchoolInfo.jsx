import React, {Component} from 'react'
import styles from '../Home.less'
import classNames from 'classnames'
export default class extends React.Component {
  render() {
    const {QSInfo} = this.props.schooldetails
    const masker = {}
    let Listitem;
    if (QSInfo.QSInfo && QSInfo.QSInfo.data != undefined) {
      Listitem = QSInfo.QSInfo.data.SchoolList.map((item, index) => {
        return <ul key={index}>
          <li>
            <span>所在地：</span>
            <span>{item.province ? item.province : '--'}</span>
          </li>
          <li>
            <span>院士：</span>
            <span>{item.Academician != '0' ? item.Academician : '--'}{item.Academician != '0' ? '个' : ''}</span>
          </li>
          <li>
            <span>硕士点：</span>
            <span>{item.MasterPilot  != '0'  ? item.MasterPilot : '--'}{item.MasterPilot  != '0'  ? '个' : ''}</span>
          </li>
          <li>
            <span>博士点：</span>
            <span>{item.DoctorStation  != '0'  ? item.DoctorStation : '--'}{item.DoctorStation  != '0'  ? '个' : ''}</span>
          </li>
          <li style={{width: item.membership.length > 3 ? '67%' : '33%'}}>
            <span>类型：</span>
            <span>{item.schoolnature ? item.schoolnature : '--'}</span>
          </li>
          <li style={{width: item.membership.length > 3 ? '100%' : '33%'}}>
            <span>隶属于：</span>
            <span>{item.membership ? item.membership : '--'}</span>
          </li>
          <li>
            <span>国家重点学科：</span>
            <span>{item.KeySubject  != '0'  ? item.KeySubject : '--'}{item.KeySubject  != '0'  ? '个' : ''}</span>
          </li>
        </ul>
      })
    } else {
      Listitem = ''
    }
    return (
      <div className={classNames(styles.schoolInfo, 'clearfix')}>
        {Listitem}
      </div>
    )
  }
}
