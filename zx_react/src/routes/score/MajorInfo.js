import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import MajorInfo from '../../components/score/MajorInfo'

function MajorList(props) {
  return (

      <MajorInfo {...props}/>

  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(MajorList);
