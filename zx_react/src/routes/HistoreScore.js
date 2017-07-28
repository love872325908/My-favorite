import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import HistoryScore from '../components/schooldetails/HistoryScore'

function HistoryScorePage(props) {
  return (
    <div>
      <HistoryScore {...props}></HistoryScore>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(HistoryScorePage);
