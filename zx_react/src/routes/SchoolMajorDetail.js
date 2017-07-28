import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import SchoolMajorInfo from '../components/schooldetails/SchoolMajorInfo'

function SchoolMajorInfoPage(props) {
  return (
    <div>
      <SchoolMajorInfo {...props}></SchoolMajorInfo>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(SchoolMajorInfoPage);
