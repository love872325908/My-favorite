import get, {GetRequest} from '../../services/service.js'
let argument = GetRequest();
module.exports = {
  namespace: 'schooldetails',
  state: {
    QSInfo: [],
    IntroduceType: [],
    Introduce: [],
    SchoolId: argument.ID,
    isShow:'info',
    MajorDetail:[]
  },
  subscriptions: {
    querySchool({dispatch, history}){
      return history.listen(({pathname}) => {
        console.log(pathname)
        if (pathname == '/schooldetails' || pathname == '/schooldetails/schoolindex' || pathname == '/schooldetails/cutoffscore' || pathname == '/schooldetails/historescore' || pathname == '/schooldetails/admissionsmsg' || pathname == '/schooldetails/guide' || pathname == '/schooldetails/schoolmajor') {
          dispatch({type: 'getQuerySchoolInfo', payload: {argument: GetRequest()}});
          dispatch({type: 'getIntroduceType', payload: {argument: GetRequest()}});
        }
      })
    },
  },
  effects: {
    * getQuerySchoolInfo({payload: {argument}}, {put, call}){
      console.log(argument)
      const QSInfo = yield call(get, {
        url: '/Interface/YXK/AcademyApi.ashx/',
        action: 'GetAcademyByID',
        Id: argument.ID ? argument.ID : argument.argument.ID
      })
      yield put({type: 'saveQuerySchoolInfo', payload: {QSInfo}})
    },
    * getIntroduceType({payload: {argument}}, {put, call}){
      const IntroduceType = yield call(get, {
        url: '/Interface/YXK/IntroduceApi.ashx/',
        action: 'GetIntroduceTypeList',
      })
      yield put({type: 'saveIntroduceType', payload: {IntroduceType}})
    },
    * getIntroduce({payload: argument}, {put, call, select}){
      const state = yield select(state => state)
      const Introduce = yield call(get, {
        url: '/Interface/YXK/IntroduceApi.ashx/',
        action: 'GetIntroduceList',
        SchoolID: argument.ID ? argument.ID : argument.argument.ID,
        CategoryID: argument.CategoryID ? argument.CategoryID : 1
      })
      yield put({type: 'saveIntroduce', payload: {Introduce}})
    },
    * genSchoolMajor({payload: argument}, {put, call, select}){
      let WLID;
      if (argument.wl == '文科') {
        WLID = '1';
      } else if (argument.wl == '理科') {
        WLID = '2';
      } else {
        WLID = ''
      }
      const SchoolMajorList = yield call(get, {
        url: 'Interface/YXK/AcademyMajorApi.ashx', action: 'GetAcademyMajorList',
        Year: argument.year, wl: WLID, AreaID: argument.AreaID, SchoolID: argument.SID ? argument.SID : 30
      })
      yield put({type: 'saveSchoolMajorList', payload: SchoolMajorList})
    },
    * genHistoryGrade({payload: argument}, {put, call}){
      let WLID;
      if (argument.wl == '文科') {
        WLID = '1';
      } else if (argument.wl == '理科') {
        WLID = '2';
      } else {
        WLID = ''
      }
      const HistoryGraph = yield call(get, {
        url: 'Interface/YXK/FractionalLineApi.ashx', action: 'GetFractionalLine',
        year: argument.year ? argument.year : '',
        wlid: WLID ? WLID : '',
        batchid: argument.batchid ? argument.batchid : '',
        schoolid: argument.schoolid ? argument.schoolid : 30,
        provinceid: argument.provinceid ? argument.provinceid : '',
      })
      console.log(argument.year)
      if (argument.year) {
        yield put({type: 'saveHistoryGrade', payload: HistoryGraph})
      } else {
        yield put({type: 'saveGraphData', payload: HistoryGraph})
      }
    },
    * getSchoolMajorDetail({payload: argument}, {put, call}){
      console.log(argument)
      const MajorDetail = yield call(get, {
        url: 'Interface/YXK/SchoolSpecialtyApi.ashx', action: 'GetSpecialtyIntro',
        schoolid: argument.schoolid,
        zid: argument.zid,
      })
      yield put({type: 'saveSchoolMajorDetail', payload: MajorDetail})
    },

  },
  reducers: {
    saveQuerySchoolInfo(state, {payload: QSInfo}){
      return {...state, QSInfo}
    },
    saveIntroduceType(state, {payload: IntroduceType}){
      return {...state, IntroduceType}
    },
    saveIntroduce(state, {payload: Introduce}){
      console.log(Introduce)
      return {...state, Introduce}
    },
    saveSchoolMajorList(state, {payload: SchoolMajorList}){
      return {...state, SchoolMajorList}
    },
    saveHistoryGrade(state, {payload: HistoryGrade}){
      return {...state, HistoryGrade}
    },
    saveGraphData(state, {payload: GraphData}){
      return {...state, GraphData}
    },
    saveSchoolId(state, {payload: SchoolId}){
      return {...state, SchoolId}
    },
    saveSchoolMajorDetail(state, {payload: MajorDetail}){
      return {...state, MajorDetail}
    },
    saveMajorShow(state,{payload:isShow}){
      console.log(isShow)
      return {...state,isShow}
    },
    saveSeletMajor(state,{payload:seletMajor}){
      console.log(seletMajor)
      return {...state,seletMajor}
    }
  },
}



