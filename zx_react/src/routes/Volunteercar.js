import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import VolunteerCar from '../components/volunteercar/Home'

function VolunteerCarPage(props) {
  return (
    <div>
      <VolunteerCar {...props}></VolunteerCar>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(VolunteerCarPage);
