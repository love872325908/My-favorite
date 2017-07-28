import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Evaluate from '../components/volunteercar/Evaluate'

function EvaluatePage(props) {
  return (
    <div>
      <Evaluate {...props}></Evaluate>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(EvaluatePage);
