import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Result from '../../components/compete/Result'

function ReultInfo(props) {
  return (
      <Result {...props}/>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(ReultInfo);
