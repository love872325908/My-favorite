import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Admit from '../components/admit/Home'

function AdmitPage(props) {
  return (
    <div>
      <Admit {...props}></Admit>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(AdmitPage);
