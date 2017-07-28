import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import SchoolImgPage from '../components/schooldetails/SchoolImg'

function SimgPage(props) {
  return (
    <div>
      <SchoolImgPage {...props}></SchoolImgPage>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(SimgPage);
