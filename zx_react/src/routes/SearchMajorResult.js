import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import SearchMajorResult from '../components/searchmajor/searchResult'

function SearchMajorResultPage(props) {
  return (
    <div>
      <SearchMajorResult {...props}></SearchMajorResult>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(SearchMajorResultPage);
