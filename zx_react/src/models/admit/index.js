import get from '../../services/service.js'

const ITEM_TYPES = [
  'admit', 'queryresult', 'city', 'select'
];
module.exports = {
  namespace: 'getSchool',
  state: {
    CityList: [],
    MajorList: [],
    SchoolList: {},
    SchoolMajor: '请选择院校专业'
  },
  subscriptions: {
    cityList({dispatch, history}){
      return history.listen(({pathname}) => {
        let actionOne = 'GetProvinceList';
        let actionTwo = 'GetProfessionalList';
        if (pathname == '/admit') {
          dispatch({type: 'getCityList', payload: {actionOne}});
          dispatch({type: 'getMajorType', payload: {actionTwo}});
        }
        if (pathname == '/city' || pathname == '/select') {
          dispatch({type: 'getCityList', payload: {actionOne}});
        }
      })
    },
  },
  effects: {
    //获取省市列表
    * getCityList({payload: actionOne}, {put, call, select}){
      const state = yield select(state => state)
      if (!state.CityList) {
        const CityList = yield call(get, {url: '/Interface/YXK/PublicApi.ashx/', action: 'GetProvinceList'})
        yield put({type: 'saveCity', payload: CityList})
      }
    },
    //获取专业大类列表
    * getMajorType({payload: actionTwo}, {put, call}){
      const MajorList = yield call(get, {url: '/Interface/YXK/PublicApi.ashx/', action: 'GetProfessionalList'})
      yield put({type: 'saveMajorList', payload: MajorList})
    },
    //获取学校列表
    * getSchoolList({payload: argument}, {put, call, select}){
      // let pages = yield select(state => state.getSchool.page)
      const SchoolList = yield call(get, {
        url: '/Interface/YXK/AcademyApi.ashx/',
        action: 'GetAcademyList',
        page: argument.page ? argument.page : 1,
        province: argument.province ? argument.province : '',
        schooltype: argument.schooltype ? argument.schooltype : '',
      })
      let CurrentPage = SchoolList.data.CurrentPage;
      let List = SchoolList.data.SchoolList;
      console.log(List)
      yield put({type: 'saveSchoolList', payload: {CurrentPage, List}})
      yield put({type: 'newSchoolList', payload: SchoolList})
    },
    //获取学校专业列表
    * getMajorList({payload: argument}, {put, call}){
      let WL;
      if (argument.wl == '文科') {
        WL = 1;
      } else if (argument.wl == '理科') {
        WL = 2;
      } else {
        WL : ''
      }
      const SchoolMajorList = yield call(get, {
        url: '/Interface/YXK/AcademyMajorApi.ashx/',
        action: 'GetAcademyMajorList',
        SchoolID: argument.SchoolID,
        AreaID: argument.AreaID ? argument.AreaID : '',
        wl: WL,
      })
      yield put({type: 'saveSchoolMajorList', payload: {SchoolMajorList}})
    },
  },
  reducers: {
    saveCity(state, {payload: CityList}){
      return {...state, CityList}
    },
    saveMajorList(state, {payload: MajorList}){
      return {...state, MajorList}
    },
    saveSchoolList(state, {payload}){
      const {CurrentPage, List} = payload;
      return {...state, SchoolList: {...state.SchoolList, [CurrentPage]: List}}
    },
    saveSchoolType(state, {payload: SchoolType}){
      return {...state, SchoolType}
    },
    saveSchoolMajorList(state, {payload: SchoolMajorList}){
      return {...state, SchoolMajorList}
    },
    newSchoolList(state, {payload: SchoolList}){
      return {...state, SchoolList}
    },
    changeSchoolMajor(state, {payload: SchoolMajor}){
      return {...state, SchoolMajor}
    },
    showAdmitPicker(state, {payload: show}){
      return {
        ...state,
        show
      }
    },
  },
}



