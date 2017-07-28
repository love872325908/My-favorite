import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Major from '../../components/score/Major'

function MajorHome(props) {
  return (

      <Major {...props}></Major>

  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(MajorHome);
