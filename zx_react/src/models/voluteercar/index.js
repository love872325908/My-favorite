import get, {GetRequest} from '../../services/service.js'
module.exports = {
  namespace: 'voluteercar',
  state: {
    ifShow: false
  },
  subscriptions: {
    buyMoney({dispatch, history}){
      return history.listen(({pathname}) => {
        console.log(pathname)
        if (pathname == '/volunteercar/') {
          dispatch({type: 'getBuyMoney'});
        }
      })
    }
  },
  effects: {
    * getBuyMoney({payload: argument}, {put, call}){
      const Money = yield call(get, {
        url: '/Interface/YXK/OrderApi.ashx/',
        action: 'GetYXKPriceList',
      })
      yield put({type: 'saveMoney', payload: {Money}})
    },
    * getOrderId({payload: argument}, {put, call}){
      const buyOrder = yield call(get, {
        url: '/Interface/YXK/OrderApi.ashx/',
        action: 'UserBuyYXK',
        PaymentID: argument.PaymentID,
        PriceID: argument.PriceID
      })
      yield put({type: 'saveOrderId', payload: {buyOrder}})
    },
    * getOrderState({payload: argument}, {put, call}){
      const OrderState = yield call(get, {
        url: '/Interface/YXK/OrderApi.ashx/',
        action: 'GetOrderByOrderID',
        OrderID: argument.oid,
      })
      yield put({type: 'saveOrderState', payload: {OrderState}})
    },
    * getMajorList({payload: argument}, {put, call}){
      let wlid;
      if (argument.wl == '文科') {
        wlid = 1;
      } else if (argument.wl == '理科') {
        wlid = 2;
      } else {
        wlid = ''
      }
      const SchoolMajorList = yield call(get, {
        url: '/Interface/YXK/AcademyMajorApi.ashx/',
        action: 'GetAcademyMajorList',
        SchoolID: argument.SchoolID,
        AreaID: argument.AreaID ? argument.AreaID : '',
        wl: wlid,
        year: argument.year ? argument.year : 2016,
      })
      console.log('---------SchoolMajorList------------')
      console.log(SchoolMajorList)
      yield put({type: 'saveSchoolMajorList', payload: {SchoolMajorList}})
    },
  },
  reducers: {
    saveMoney(state, {payload: Money}){
      return {...state, Money}
    },
    saveOrderId(state, {payload: buyOrder}){
      return {...state, buyOrder}
    },
    saveOrderState(state, {payload: OrderState}){
      return {...state, OrderState}
    },
    saveDialog(state, {payload: ifShow}){
      return {...state, ifShow}
    },
    saveSchoolMajorList(state, {payload: SchoolMajorList}){
      return {...state, SchoolMajorList}
    },
  },
}



