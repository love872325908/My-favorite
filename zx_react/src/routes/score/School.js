import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import School from '../../components/score/School'

function SchoolInfo(props) {
  return (
    <div>
      <School {...props}/>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(SchoolInfo);
