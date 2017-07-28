
import { get } from '../../services/service.js'

module.exports = {
  namespace: 'home',
  state: {
    openAjax:false,
    routeUrl:'/home',
  },
  subscriptions: {
  },
  effects: {
    * openAjax({ payload: open }, { put, call,select }) {
       yield put({type: 'toggleAjax', payload: open})
    },
     * closeAjax({ payload: open }, { put, call,select }) {
       yield put({type: 'cloAjax', payload: open})
    }
  },
  reducers: {
    toggleAjax(state, { payload:openAjax }) {
      console.log('打开',openAjax)
      state.openAjax = openAjax;
      return { ...state }
    },
    cloAjax(state, { payload:open }) {
      console.log('关闭')
      state.openAjax = open;
      return { ...state }
    },
    targetUrl(state,{payload:url}){
      console.log(url,'---------------------');
      state.routeUrl = url;
      return {...state}
    },

    string(state,{payload:res}){
      console.log(res,'---------------------');

      return {...state,res}
    },
    schoolUrl(state,{payload:sUrl}){
      return {...state,sUrl}
    },
  }
}
