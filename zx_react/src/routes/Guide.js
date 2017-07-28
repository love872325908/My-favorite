import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Guide from '../components/schooldetails/Guide'

function GuidePage(props) {
  return (
    <div>
      <Guide {...props}></Guide>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(GuidePage);
