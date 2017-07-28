import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import BatchInfo from '../../components/score/BatchInfo'

function BatchList(props) {
  return (

      <BatchInfo {...props}/>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(BatchList);
