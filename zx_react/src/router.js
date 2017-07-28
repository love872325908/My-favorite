import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute, Link, Redirect} from 'dva/router'
import HomePage from './routes/HomePage';
import SelectPage from './routes/SelectPage';
import ScorePage from './routes/ScorePage';
import QueryResult from './routes/QueryResult';
import AdmitPage from './routes/Admit';
import DetailsPage from './routes/Schooldetails';
import SchoolMsg from './routes/SchoolMsg'
import CutoffScore from './routes/CutoffScore'
import HistoreScore from './routes/HistoreScore'
import AdmissionsMsg from './routes/AdmissionsMsg'
import Guide from './routes/Guide'
import SchoolImg from './routes/SchoolImg'
import SearchMajorPage from './routes/SearchMajor'
import Volunteercar from './routes/Volunteercar'
import Introduction from './routes/Introduction'
import Evaluate from './routes/Evaluate'
import School from './routes/score/School';
import Batch from './routes/score/Batch';
import Major from './routes/score/Major';
import BatchInfo from './routes/score/BatchInfo';
import MajorInfo from './routes/score/MajorInfo';
import Compete from './routes/compete/Compete';
import Result from './routes/compete/Result';
import City from './routes/compete/City';
import SchoolSel from './routes/compete/School';
import OpenUpMajorSchool from './routes/OpenUpMajorSchool';
import HomeList from './routes/home/Home';
import MajorMsg from './routes/MajorMsg';
import SearchMajorResult from './routes/SearchMajorResult';
import LoginHome from './routes/Login';
import SchoolIndex from './routes/SchoolIndex';
import SchoolMajor from './routes/SchoolMajorDetail';
import MajorHistoryLine from './routes/MajorHistoryLine';
export default function ({history}) {
  return (
    <Router history={history}>
      <Redirect from='/' to='/home'/>
      <Route path='/home' component={HomePage}>
        <IndexRoute component={HomeList}/>
        <Route path='/home/city' component={HomeList}/>
        <Route path='/home/majorl' component={HomeList}/>
        <Route path='/home/majorq' component={HomeList}/>
        <Route path='/home/school' component={HomeList}/>
        <Route path='/home/select' component={HomeList}/>
      </Route>
      <Route path='/login' component={LoginHome}/>
      <Route path='/select' component={SelectPage}/>
      <Route path='/batchInfo' component={BatchInfo}/>
      <Route path='/majorInfo' component={MajorInfo}/>
      <Route path='/compete' component={Compete}/>
      <Route path='/city' component={City}/>
      <Route path='/result' component={Result}/>
      <Route path='/schoolSel' component={SchoolSel}/>
      <Route path='/score' component={ScorePage}>
        <IndexRoute component={School}/>
        <Route path='/score/school' component={School}/>
        <Route path='/score/major' component={Major}/>
        <Route path='/score/batch' component={Batch}/>
      </Route>
      <Route path='/admit'>
        <IndexRoute component={AdmitPage}/>
        <Route path=":page" component={AdmitPage}/>
      </Route>
      <Route path='/schooldetails' component={DetailsPage}>
        <IndexRoute component={SchoolMsg}/>
        <Route path='/schooldetails/schoolindex' component={SchoolIndex}></Route>
        <Route path='/schooldetails/cutoffscore' component={CutoffScore}></Route>
        <Route path='/schooldetails/historescore' component={HistoreScore}></Route>
        <Route path='/schooldetails/admissionsmsg' component={AdmissionsMsg}></Route>
        <Route path='/schooldetails/guide' component={Guide}></Route>
        <Route path='/schooldetails/schoolimg' component={SchoolImg}></Route>
        <Route path='/schooldetails/schoolmajor' component={SchoolMajor}></Route>
      </Route>
      <Route path='/searchmajor'>
        <IndexRoute component={SearchMajorPage}/>
      </Route>
      <Route path="/searchResult" component={SearchMajorResult}>
        <IndexRoute component={SearchMajorResult}/>
        <Route path="/searchResult/openmajorschool" component={OpenUpMajorSchool}/>
        <Route path="/searchResult/majormsg" component={MajorMsg}/>
      </Route>
      <Route path='/queryresult'>
        <IndexRoute component={QueryResult}/>
      </Route>
      <Route path='/volunteercar' component={Volunteercar}>
        <IndexRoute component={Introduction}/>
        <Route path='/volunteercar/introduction' component={Introduction}/>
        <Route path='/volunteercar/evaluate' component={Evaluate}/>
      </Route>
      <Route path='/majorHistoryLine' component={SchoolImg}>
      </Route>
    </Router>
  )
}

