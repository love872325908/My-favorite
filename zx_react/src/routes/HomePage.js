import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Home from '../components/home/Home';

function HomePage(props) {
  return (
    <div>
      <Home {...props}></Home>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(HomePage);
