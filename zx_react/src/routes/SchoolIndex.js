import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import SchoolIndex from '../components/schooldetails/SchoolIndex'

function SchoolIndexPage(props) {
  return (
    <div>
      <SchoolIndex {...props}></SchoolIndex>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(SchoolIndexPage);
