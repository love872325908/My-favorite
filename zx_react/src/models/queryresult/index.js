import get, {GetRequest} from '../../services/service.js'

import urlencode from 'urlencode'

/*
 * SchoolID:学院ID
 * AreaID：地区ID
 * Year：年份
 * wl：文理
 * specialname：专业名称
 * acceptingData: 学校ID和页码
 * changeDate: 头部信息
 * */
module.exports = {
  namespace: 'queryresult',
  state: {
    QM: [],
    acceptingData: [],
    changeDate: [],
    isShow: true,
  },
  subscriptions: {
    queryMajor({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname == '/queryresult') {
          dispatch({type: 'getMajorInfo', payload: {argument: GetRequest()}});
        }
      })
    }
  },
  effects: {
    * getMajorInfo({payload: argument}, {put, call}){
      let sname = urlencode(argument.sname, 'gbk');
      const QM = yield call(get, {
        url: '/Interface/YXK/AcademyMajorApi.ashx/',
        action: 'GetAcademyMajorList',
        page: argument.page ? argument.page : 1,
        SchoolID: argument.schoolId ? argument.schoolId : 30,
        wl: argument.wl ? argument.wl : '',
        sname: sname ? sname : '',
        province: argument.diquID ? argument.diquID : '',
        Year: argument.year ? argument.year : 2016
      })
      yield put({type: 'saveQueryMajorInfo', payload: {QM}})
    },
    //获取学校专业列表
    * getSchoolMajor({payload: argument}, {put, call}){
      const SM = yield call(get, {
        url: '/Interface/YXK/SchoolSpecialtyApi.ashx/',
        action: 'GetSchoolSpecialtyList',
        Page: argument.Page ? argument.Page : 1,
        schoolid: argument.schoolid,
      })
      yield put({type: 'saveSchoolMajor', payload: {SM}})
    },
    //获取专业分数线近五年数据
    * getMajorLineFire({payload: argument}, {put, call}){
      let WLID;
      if (argument.wl == '文科') {
        WLID = '1';
      } else if (argument.wl == '理科') {
        WLID = '2';
      } else {
        WLID = ''
      }
      const LineFire = yield call(get, {
        url: '/Interface/YXK/AcademyMajorApi.ashx/',
        action: 'GetSchoolMajorLineYear',
        SchoolID: argument.SchoolID ? argument.SchoolID : '',
        province: argument.province ? argument.province : '',
        wl: WLID ? WLID : '',
        pcid: argument.pcid ? argument.pcid : '',
        sname: urlencode(argument.sname, 'gbk'),
      })
      yield put({type: 'saveMajorLineFire', payload: {LineFire}})
    },
  },
  reducers: {
    saveQueryMajorInfo(state, {payload: QM}){
      return {...state, QM}
    },
    saveAcceptingData(state, {payload: acceptingData}){
      return {...state, acceptingData}
    },
    saveDate(state, {payload: changeDate}){
      return {...state, changeDate}
    },
    saveAdmitData(state, {payload: AdmitData}){
      return {...state, AdmitData}
    },
    saveSchoolMajor(state, {payload: SM}){
      return {...state, SM}
    },
    saveMajorLineFire(state, {payload: LineFire}){
      console.log('---------LineFire----------')
      console.log(LineFire)
      return {...state, LineFire}
    },
    graphShow(state, {payload: isShow}){
      return {...state, isShow}
    },
  },
}



