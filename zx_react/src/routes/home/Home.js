import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import CityQ from '../../components/home/quick/CityQ';
import MajorL from '../../components/home/quick/MajorL';
import MajorQ from '../../components/home/quick/MajorQ';
import SchoolQ from '../../components/home/quick/SchoolQ';
import SelectQ from '../../components/home/quick/SelectQ';

function HomeList(props) {

  const {pathname} = props.location;
   console.log(pathname )
  switch(pathname){
    case '/home/school': return <SchoolQ {...props}/>;
    case '/home/majorl': return <MajorL {...props}/>;
    case '/home/select': return <SelectQ {...props}/>;
    case '/home/majorq': return <MajorQ {...props}/>;
    case '/home/city': return <CityQ {...props}/>;
    default:return <SelectQ {...props}/>;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    
    ...state,
  };
}

export default connect(mapStateToProps)(HomeList);
