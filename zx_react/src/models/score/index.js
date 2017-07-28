import get, {GetRequest} from '../../services/service.js'

import urlencode from 'urlencode';
const ITEM_TYPES = [
  '/score/school', '/score/major','/score/batch','/schooldetails/cutoffscore','/schooldetails/historescore','/select','/home','/home/select','/home/majorq'
  ,'/home/majorl','/home/city','/home/school','/admit','/schooldetails/schoolmajor'
];
const DEL_ITEM = [
  '/score/school',
]
var year,ID;
module.exports = {
  namespace: 'score',
  state: {
    wl:['不限','文科','理科'],
    option:'',
    year:2016,
    Wl:'理科',
    province:'',
    schoolCity:'',
    pc:'',
    professional:'请选择',
    min:'请选择',
    schoolName:'请选择大学',
    schoolType:'',
    major:'请选择专业'
  },
  subscriptions: {
    itemSubscriber({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        let action = 'GetBatchList';
        let action_sch = 'GetProvinceList';
        let action_class = 'GetProfessionalMax'
        for (let type of ITEM_TYPES) {
            if(pathname == type){
             dispatch({type: 'GetBatchList', payload: {action}});
             dispatch({type: 'GetUserCitylList', payload: 'GetProvince'});
             dispatch({type: 'GetCitylList', payload: {action_sch}});
             dispatch({type: 'GetProfessionalMax', payload: {action_class}});
             dispatch({type: 'DelSchoolList'});
            //  dispatch({type: 'home/openAjax',payload:true});
            }
        }
        if(pathname == '/select' || pathname == '/home' || pathname == '/home/select'){
          dispatch({type: 'DelSchoolList'});
          dispatch({type:'GetSchoolType'})

        }
        // 使用相同的需要的数据源需要清空状态
        for (let type of DEL_ITEM) {
           if(pathname == type){
             dispatch({type:'DelState'})
           }
        }

        if(pathname == '/batchInfo'){
          dispatch({type: 'GetUserCitylList', payload: 'GetProvince'});
        }
      });
    },


  },
  effects: {
    // 获取批次列表
    * GetBatchList({payload: {action}}, {put, call,select}){
      const state = yield select(state=>state)
      // 如果状态已经存在了就不发重复的请求了
      if(!state.score.BatchList)
      {
      const BatchList = yield call(get, {url: '/Interface/YXK/PublicApi.ashx/', action: action,})
      // BatchList.data.pList.insert(0,{Name:"不限"})

      yield put({type: 'saveBatchList', payload: BatchList})
      }
    },
        //获取院校类型
    * GetSchoolType({payload: argument}, {put, call}){
      console.log('进来获取学校')
      const SchoolType = yield call(get, {
        url: '/Interface/YXK/PublicApi.ashx/',
        action: 'GetCategoryList',
        typeID: 2
      })

      yield put({type: 'saveSchoolType', payload: {SchoolType}})
    },
    // 获取地区列表
    * GetCitylList ({payload: {action_sch}}, {put, call,select}){
      const state = yield select(state=>state)

      if(!state.score.CityList)
      {
      const CityList = yield call(get, {url: '/Interface/YXK/PublicApi.ashx/', action: action_sch})
      // CityList.data.pList.insert(0,{ProvinceName:"不限"})

      yield put({type: 'saveCityList', payload: CityList})
      }
    },
    //获取用户所在省份
    * GetUserCitylList ({payload: province}, {put, call,select}){
      const state = yield select(state=>state)
      if(state.score.province == ''){
      const CityList = yield call(get, {url: '/Interface/YXK/PublicApi.ashx/', action: province})
      console.log(CityList)
      yield put({type: 'saveUserCityList', payload: CityList})
      }


    },
    //获取专业大类
    * GetProfessionalMax({payload: {action_class}}, {put, call,select}){
      const state = yield select(state=>state)

      if(!state.score.ClassList)
      {
      const ClassList = yield call(get, {url: '/Interface/YXK/SchoolSpecialtyApi.ashx/', action: action_class})
      // ClassList.data.pList.insert(0,{Name:"不限"})

      yield put({type: 'saveClassList', payload: ClassList})
      }
    },
    // 获取学校列表
    * GetSchooList({payload: argument}, {put, call,select}){
      yield put({type: 'home/openAjax',payload:true});
      const state = yield select(state=>state);
      let TypeID,PID,sname;

      state.score.CityList.data.pList.map((item)=>{
        if(item.ProvinceName == argument.province){
         PID =  item.ID;
        }
      })

      state.score.SchoolType.SchoolType.data.pList.map((item)=>{
        console.log(item.Name,argument.schoolType)
        if(item.Name == argument.schoolType){
         TypeID =  item.ID;
        }})

      if(argument.province == "不限" || !PID){
        PID = '';
        console.log('province')
      }
      // if(argument.pc == "不限" || !PCID){
      //   PCID = '';
      //   console.log('pc')
      // }
      console.log(argument.page,'-----------------')
      const SchoolName = yield call(get, {url:'/Interface/YXK/AcademyApi.ashx/', action: 'GetAcademyList',page:argument.page? argument.page:1,
      schooltype:TypeID, province:PID
      })
      yield put({type: 'home/cloAjax',payload:false});
      yield put({type: 'saveSchoolName', payload:  SchoolName})
    },


    // 获取分数线
    * GetSchoolLine({payload: argument}, {put, call,select}){
      const state = yield select(state=>state)
      yield put({type: 'home/openAjax',payload:true});
      let PCID='',WLID='',PID='',sname='';
        /**
         * PCID：批次ID
         * WLID：文理ID
         * PID：地区ID
         * sname:专业名称
         */
      // 获取文理科ID
      if(argument.wl == '文科'){
        WLID = '1';
      }else{
        WLID = '2';
      }
       // 根据地区名称来获取地区ID
       if(state.score.CityList){

        state.score.CityList.data.pList.map((item)=>{
          if(item.ProvinceName == argument.province){
          PID =  item.ID;
          }
        })
       }
      // 根据批次名称来获取批次ID
      if(state.score.BatchList){

      state.score.BatchList.data.pList.map((item)=>{
        if(item.Name == argument.pc){
         PCID =  item.ID;
        }})
      }

      console.log({wl:argument.wl,province:argument.province,pc:argument.pc,year:argument.year,professional:argument.professional,ID:argument.ID})
      if(argument.wl == "不限" || !argument.wl){
        WLID = '';
        console.log('wl')
      }
      if(argument.province == "不限" || !PID){
        PID = '';
        console.log('province')

      } if(argument.pc == "不限" || !PCID){
        PCID = '';
        console.log('pc')
      } if(argument.year == "不限" || !argument.year){
        argument.year = '';
      } if(argument.professional == "不限" || argument.professional =='请选择' || !argument.professional){
        argument.professional = '';
      } if(!argument.ID){
        argument.ID = '';
      }
      console.log(1231321456,PCID,PID,WLID,argument.year,argument.professional,argument.year,argument.ID)


      // 获取学校列表
    // 获取地区分数线
      if(argument.grade){
        if(year == argument.year  ){
          return false;
          //如果是点击同一个年份就不发送同样的请求了
        }
        //  year = argument.year;
        const HistoryLine = yield call(get, {url:'/Interface/YXK/GradeLineApi.ashx/', action: 'GetGradeLineYear', type:WLID, bathid:PCID, provinceid:PID
        });
        const GradeLine = yield call(get, {url:'/Interface/YXK/GradeLineApi.ashx/', action: 'GetGradeLine',page:1,
        year:argument.year, type:WLID, bathid:PCID, provinceid:PID
        });
      yield put({type: 'home/cloAjax',payload:false});
      yield put({type: 'saveGradelLine', payload:  GradeLine,HistoryLine})
    }
    else{
        // 获取高校分数线以及专业分数线
       if(ID == argument.ID){
          return false;
        //如果是点击同一个年份就不发送同样的请求了
        }
        console.log(ID,argument.ID)
        // ID = argument.ID;
        console.log(ID,argument.ID)
        if(argument.info){
          const MajorLine = yield call(get, {url:'/Interface/YXK/AcademyMajorApi.ashx/', action: 'GetSchoolMajorLine',page:argument.page? argument.page:1,
          year:argument.year, wl:WLID, pcid:PCID, province:PID,sname:urlencode(argument.professional,'gbk'),SchoolID:argument.ID
        })
        yield put({type: 'home/cloAjax',payload:false});
        yield put({type: 'saveMajorLine', payload: MajorLine})

        }else{
          const SchoolLine = yield call(get, {url:'/Interface/YXK/AcademyMajorApi.ashx/', action: 'GetSchoolMajorLine',page:argument.page? argument.page:1,
          year:argument.year, wl:WLID, pcid:PCID, province:PID,sname:urlencode(argument.professional,'gbk'),SchoolID:argument.ID
        })
        yield put({type: 'home/cloAjax',payload:false});
        yield put({type: 'saveSchoolLine', payload: SchoolLine})
        }
      }



    },
    * Specialname({payload: argument}, {put, call,select}){
      let specName = argument.specName;
      yield put({type: 'home/openAjax',payload:true});
       const Specialname = yield call(get, {url:'/Interface/YXK/SchoolSpecialtyApi.ashx/', action: 'SpecialtyOpneSchool',
       page:argument.page? argument.page:1,specialname:urlencode(argument.specName,'gbk')})
       yield put({type: 'home/cloAjax',payload:false});
       yield put({type: 'saveSpecialname', payload: Specialname,specName})

    }
  },
  reducers: {
    saveBatchList(state, {payload: BatchList}){
      // console.log(BatchList)
     state.pc = BatchList.data.pList[0].Name;
      return {...state, BatchList}
    },
    // 清空学校列表数据以免影响其他组件
    // DelSchoolList(state){
    //   state.schoolName ='';
    //   console.log('--------------------清空------------------------------------')
    //   return {...state}
    // },
    // 保存城市列表
     saveCityList(state, {payload: CityList}){
      return {...state, CityList}
    },
    //保存用户来源城市
    saveUserCityList(state,{payload:CityList}){
      if(CityList && CityList.data.S == 1){
        state.province = CityList.data.pList[0].ProvinceName;
        state.schoolCity = CityList.data.pList[0].ProvinceName;
      }else{
        state.province = '北京';
      }

      console.log(state.province )
      return {...state}
    },
    // 获取学院类型ID
    saveSchoolType(state,{payload:SchoolType}){
      console.log(SchoolType)
      state.schoolType = SchoolType.SchoolType.data.pList[0].Name
      return { ...state , SchoolType}
    },
    saveClassList(state, {payload: ClassList}){
      console.log(ClassList)
      return {...state, ClassList}
    },
    // 保存学校分数线结果
    saveSchoolLine(state, {payload: SchoolLine}){
      console.log(SchoolLine)
      return {...state, SchoolLine}
    },
    saveMajorLine(state, {payload: MajorLine}){
      console.log(MajorLine)
      return {...state, MajorLine}
    },
     saveGradelLine(state, {payload: GradeLine,HistoryLine}){
      console.log(GradeLine,HistoryLine)
      return {...state, GradeLine,HistoryLine}
    },
    // 保存学校列表结果
    saveSchoolName(state, {payload: SchoolName}){
      console.log(SchoolName)
      return {...state, SchoolName}
    },
    selectOption(state,{payload: option}){

      return {...state , option}
      //   const { type, slist } = payload;
      // return { ...state, [type]: slist }
    },
    // 更改年份
    changeYear(state,{ payload: year}){
      return { ...state,  year}
    },
    // 更改文理
    changeWl(state,{ payload: Wl}){

      return { ...state, Wl }
    },
    // 更改省份
    changeProvince(state,{ payload: province}){

      return { ...state,province  }
    },
    // 更改批次
    changePc(state,{ payload: pc}){

      return { ...state,pc,}
    },
    // 更改学校所在地
    changeSchoolCity(state,{payload:schoolCity}){
      return { ...state,schoolCity}
    },
    // 更改地区状态
    changeSname(state,{ payload: professional}){

      return { ...state,professional}
    },
    //根据专业获取学校
    saveSpecialname(state,{payload:Specialname,specName}){
      return { ...state, Specialname,specName}
    },
    // 根据批次和地区选择大学
    changeSchoolName(state,{payload:schoolName}){
      return { ...state, schoolName}
    },
    // 更改学校类型
    changeSchoolType(state,{payload:schoolType}){
      return { ...state, schoolType}
    },
    //  更改学校开设专业请求
    changeMajor(state,{payload:major}){
      return { ...state, major}
    },
    //清空状态
    DelState(state,){
      console.log('进来清空状态',state)
    state.SchoolLine = ''

      return {...state }
    },
    //更改小类状态
    changeMin(state,{payload:min}){
      return { ...state, min}
    }

  },
}



