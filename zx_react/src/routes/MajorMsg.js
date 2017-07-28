import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MajorInfo from '../components/searchmajor/majordetails/Home'

function MajorInfoPage(props) {
  return (
    <div>
      <MajorInfo {...props}></MajorInfo>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(MajorInfoPage);
