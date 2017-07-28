import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import SearchMajor from '../components/searchmajor/Home'

function SearchPage(props) {
  return (
    <div>
      <SearchMajor {...props}></SearchMajor>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(SearchPage);
