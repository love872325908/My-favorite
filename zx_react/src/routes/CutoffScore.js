import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import CutoffScore from '../components/schooldetails/CutoffScore'

function CutoffScorePage(props) {
  return (
    <div>
      <CutoffScore {...props}></CutoffScore>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(CutoffScorePage);
