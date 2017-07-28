import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import majorHistoryLine from '../components/schooldetails/majorHistoryLine'

function historyLine(props) {
  return (
    <div>
      <majorHistoryLine {...props}></majorHistoryLine>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(historyLine);
