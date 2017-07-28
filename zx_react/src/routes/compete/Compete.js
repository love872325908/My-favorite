import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Compete from '../../components/compete/Compete'

function CompeteInfo(props) {
  return (
      <Compete {...props}/>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(CompeteInfo);
