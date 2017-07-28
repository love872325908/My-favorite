import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Batch from '../../components/score/Batch'

function BatchHome(props) {
  return (
      <Batch {...props}/>

  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(BatchHome);
