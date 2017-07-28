import React from 'react'
import styles from './HeaderMsg.less'
export default class extends React.Component {
  render() {
    let str = this.props.queryresult;
    return (
      <header className={styles.headBox}>
        {
          str.AdmitData ? <div className={styles.headInfo}>
            【{str.AdmitData.schoolName ? str.AdmitData.schoolName : ''}】往年在【{str.AdmitData.province ? str.AdmitData.province : ''}】&nbsp;
            【{str.AdmitData.Wl ? str.AdmitData.Wl : ''}】【{str.AdmitData.pc ? str.AdmitData.pc : ''}】录取详情
          </div> : ''
        }

      </header>
    )
  }
}
