import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Score from '../components/home/Score'

function ScorePage(props) {
  return (
    <div>
      <Score {...props}></Score>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(ScorePage);
