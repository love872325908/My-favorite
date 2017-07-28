import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import SchoolMsg from '../components/schooldetails/SchoolMsg'

function SchoolMsgPage(props) {
  return (
    <div>
      <SchoolMsg {...props}></SchoolMsg>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(SchoolMsgPage);
