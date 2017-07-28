import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Pick from '../components/home/Select'

function SelectPage(props) {
  return (
      <Pick {...props}></Pick>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(SelectPage);
