import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Introduction from '../components/volunteercar/Introduction'

function IntroductionPage(props) {
  return (
    <div>
      <Introduction {...props}></Introduction>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(IntroductionPage);
