import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Details from '../components/schooldetails/Home'

function DetailsPage(props) {
  return (
    <div>
      <Details {...props}>
      </Details>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(DetailsPage);
