import React, {Component} from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import SMC from './sdcommen/SchoolMsgCpt'
import SchoolInfo from './sdcommen/SchoolInfo'
import InfoContent from './sdcommen/InfoContent'
import {GetRequest} from '../../services/service'
export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch, schooldetails,history} = this.props;
    let argument = GetRequest();
    if(!schooldetails.SchoolId){
     // history.push('/searchmajor')
    }
    console.log(schooldetails)
    console.log(argument.ID)
    dispatch({
      type: 'schooldetails/getIntroduce',
      payload: {
        ID: schooldetails.SchoolId.ID ? schooldetails.SchoolId.ID : argument.ID,
        CategoryID: 1
      }
    })
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
