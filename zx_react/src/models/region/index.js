import get,{GetRequest} from '../../services/service.js'

const ITEM_TYPES = [
  '/select','/home','/home/select',,'/home/majorl','/home/majorq','/home/school','/home/city'
];
module.exports = {
  namespace: 'getRegion',
  state: {
    SchoolList: [],
    Contrast:[],
    open:false,
  },
  subscriptions: {
    itemSubscriber({ dispatch, history }) {

      return history.listen(({ pathname }) => {
        let action = 'GetAcademyList';
        let action_hot = 'GetAcademyOrder'
        if(pathname == '/schoolSel')
        {
          dispatch({type: 'home/openAjax',payload:true});
          dispatch({type: 'getSchoolList', payload: {action,argument:GetRequest()}});
        }
        for (let type of ITEM_TYPES) {
          if(pathname == type){

            dispatch({type:'GetHotSchool',payload:action_hot})
          }
        }
      });
    },
  },
  effects: {

    * getSchoolList({payload: {action,argument}}, {put, call,select}){
      console.log(argument)
      // const pages = yield select(state => state.getRegion.page)
      const SchoolList = yield call(get, {url: '/Interface/YXK/AcademyApi.ashx/', action: action,  page:argument.page,province:argument.province})
      console.log(SchoolList)
      yield put({type: 'home/cloAjax',payload:false});
      yield put({type: 'saveSchoolList', payload: SchoolList})
    },
    * GetHotSchool({payload:  action_hot }, {put, call,select}){
     const state = yield select(state=>state)
      if(!state.getRegion.HotSchool){
      const HotSchool = yield call(get, {url: '/Interface/YXK/AcademyApi.ashx/', action: action_hot})

      yield put({type: 'getHot', payload: HotSchool})

      }
    }
  },
  reducers: {
    saveSchoolList(state, {payload: SchoolList}){
      return {...state, SchoolList}
    },
    toggleShow(state,{payload:{open,info}}){
      return {...state,open,info}
    }
    ,
    addSchool(state,{payload:item}){
      state.Contrast.push(item);
      return {...state}
    },
    getHot(state,{payload:HotSchool}){
      return {...state, HotSchool}
    },
    delSchool(state,{payload:index}){
      // console.log()
      state.Contrast.del(index) //根据数组下标删除指定数组元素
      return {...state}
    },
    showPicker(state,{payload:show}){
      console.log(show)
      return {...state,show}
    }
  },
}



