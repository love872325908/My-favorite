import get, {GetRequest} from '../../services/service.js'
import urlencode from 'urlencode';

module.exports = {
  namespace: 'searchmajor',
  state: {
    bigMajor: [],
    smallMajor: [],
    openMajorSchool: [],
  },
  subscriptions: {
    major({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname == '/searchmajor' || pathname == '/home/majorl' || pathname == '/home/majorq' || pathname == '/score/major') {
          // let bigId = 1;
          dispatch({type: 'getBigMajor', payload: {argument: GetRequest()}});
          dispatch({type: 'getSmallMajor', payload: {argument: GetRequest()}});
        }
      })
    },
    openMajorSchool({dispatch, history}){
      return history.listen(({pathname}) => {
        if (pathname == '/searchmajor/openmajorschool') {
          // dispatch({type: 'getOpenMajorSchool', payload: {argument: GetRequest()}});
        }
      })
    }
  },
  effects: {
    * getBigMajor({payload: {argument}}, {put, call}){
      const bigMajor = yield call(get, {
        url: '/Interface/YXK/SchoolSpecialtyApi.ashx/',
        action: 'GetProfessionalMax',
      })
      console.log('-----------打印大专业-----------')
      console.log(bigMajor)
      yield put({type: 'saveBigMajorList', payload: {bigMajor}})
    },
    * getSmallMajor({payload: argument}, {put, call, select}){
      const state = yield select(state => state);
      // console.log(argument.argument.bigid,'接受')
      const smallMajor = yield call(get, {
        url: '/Interface/YXK/SchoolSpecialtyApi.ashx/',
        action: 'GetProfessionalSmall',
        zytypeid: argument.bigid || argument.argument.bigid ? argument.bigid || argument.argument.bigid : 1
      })
      console.log('-----------打印小专业-----------')
      console.log(smallMajor)
      yield put({type: 'saveSmallMajorList', payload: {smallMajor}})
    },
    * getMajorLine({payload: argument}, {put, call}){
      const MajorLine = yield call(get, {
        url: '/Interface/YXK/AcademyMajorApi.ashx/',
        action: 'GetSchoolMajorLine',
        page: 1,
        SchoolID: argument.SchoolID,
        sname: urlencode(argument.sname, 'gbk')
      })
      console.log(MajorLine)
      yield put({type: 'saveMajorLine', payload: {MajorLine}})
    },
    * getOpenMajorSchool({payload: argument}, {put, call}){
      const openMajorSchool = yield call(get, {
        url: '/Interface/YXK/SchoolSpecialtyApi.ashx/',
        action: 'SpecialtyOpneSchool',
        specialname: urlencode(argument.specialname, 'gbk'),
        page: argument.page ? argument.page : 1,
      })
      console.log('-----------打印开设专业院校-----------')
      console.log(openMajorSchool)
      yield put({type: 'saveOpenMajorSchool', payload: {openMajorSchool}})
    },
    * getMajorSearch({payload: argument}, {put, call}){
      const searchResult = yield call(get, {
        url: '/Interface/YXK/SchoolSpecialtyApi.ashx/',
        action: 'SelectProfessional',
        specialname: urlencode(argument.specialname, 'gbk'),
      })
      yield put({type: 'saveSearchResult', payload: {searchResult}})
    },
  },
  reducers: {
    saveBigMajorList(state, {payload: bigMajor}){
      return {...state, bigMajor}
    },
    saveSmallMajorList(state, {payload: smallMajor}){
      return {...state, smallMajor}
    },
    saveOpenMajorSchool(state, {payload: openMajorSchool}){
      return {...state, openMajorSchool}
    },
    saveMajorLine(state, {payload: MajorLine}){
      return {...state, MajorLine}
    },
    saveMajorInfo(state, {payload: Info}){
      return {...state, Info}
    },
    saveSearchResult(state, {payload: searchResult}){
      console.log(searchResult)
      return {...state, searchResult}
    },
  },
}



