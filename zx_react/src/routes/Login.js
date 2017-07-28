import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Login from '../components/home/Login'

function LoginHome(props) {
  return (
      <Login {...props}/>

  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(LoginHome);
