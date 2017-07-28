import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import OpenUpMS from '../components/searchmajor/havemajorschool/Home'

function OpenUpMSPage(props) {
  return (
    <div>
      <OpenUpMS {...props}></OpenUpMS>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(OpenUpMSPage);
