import React, {Component} from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import SMC from './sdcommen/SchoolMsgCpt'
import SchoolInfo from './sdcommen/SchoolInfo'
import InfoContent from './sdcommen/InfoContent'
export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch, schooldetails} = this.props;
    console.log(schooldetails)
    // dispatch({
    //   type: 'schooldetails/getIntroduce',
    //   payload: {
    //     ID: schooldetails.SchoolId.ID ? schooldetails.SchoolId.ID : '',
    //     CategoryID: 1
    //   }
    // })
  }

  render() {
    return (
      <div className={classNames('clearfix', styles.schoolBox)}>
        <SMC {...this.props}></SMC>
        <SchoolInfo {...this.props}></SchoolInfo>
        <InfoContent {...this.props}></InfoContent>
      </div>
    )
  }
}
