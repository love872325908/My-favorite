import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import QueryResult from '../components/queryresult/Home';

function QueryPage(props) {
  return (
    <div>
      <QueryResult {...props}></QueryResult>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {

    ...state,
  };
}

export default connect(mapStateToProps)(QueryPage);
