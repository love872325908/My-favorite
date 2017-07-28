import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import AdmissionsMsg from '../components/schooldetails/AdmissionsMsg'

function AdmissionsMsgPage(props) {
  return (
    <div>
      <AdmissionsMsg {...props}></AdmissionsMsg>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {

    ...state,
  };
}

export default connect(mapStateToProps)(AdmissionsMsgPage);
