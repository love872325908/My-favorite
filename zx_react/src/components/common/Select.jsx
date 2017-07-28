import React, {Component, PropTypes} from 'react';
import Picker from 'react-mobile-picker';
import styles from './Select.less';
import classNames from 'classnames'

export default class Select extends Component{
 constructor(props) {
    super(props);
    this.state = {
      name:'',
      valueGroups: {
        option: ['']
      },
      optionGroups: {
        option: ['']
      },year:'',wl:'',province:'',pc:'',professional:'',min:'',schoolCity:'',schoolName:'',schoolType:'',major:''
    };
    this.togglePicker = this.togglePicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  togglePicker(){
    const { dispatch, score ,searchmajor} = this.props;
    let ID;
    dispatch({type:'getRegion/showPicker',payload:false });
    if(searchmajor.bigMajor.bigMajor){
        searchmajor.bigMajor.bigMajor.data.pList.map((item,i)=>{
          if (this.state.professional == item.Name){
            ID = item.ID;
          }
        })
        // return false;
      }
    switch(score.option){
       case 'year':dispatch({type:'score/changeYear',payload:this.state.year });break;
       case 'wl': dispatch({type:'score/changeWl',payload:this.state.wl});break;
       case 'province':dispatch({type:'score/changeProvince',payload:this.state.province});dispatch({type:'score/changeSchoolName',payload:'请选择大学'});break;
       case 'schoolCity':dispatch({type:'score/changeSchoolCity',payload:this.state.schoolCity});dispatch({type:'score/changeSchoolName',payload:'请选择大学'});break;
       case 'pc': dispatch({type:'score/changePc',payload:this.state.pc});break;
       case 'professional': dispatch({type:'score/changeSname',payload:this.state.professional});
       dispatch({type:'score/changeMin',payload:'请选择'});
       dispatch({type:'searchmajor/getSmallMajor',payload:{bigid:ID}});

       break;
       case 'min': dispatch({type:'score/changeMin',payload:this.state.min});console.log('这里进来了');break;
       case 'schoolName': dispatch({type:'score/changeSchoolName',payload:this.state.schoolName});break;
       case 'schoolType': dispatch({type:'score/changeSchoolType',payload:this.state.schoolType});
       dispatch({type:'score/changeSchoolName',payload:'请选择大学'});
       break;
       case 'major': dispatch({type:'score/changeMajor',payload:this.state.major});break;
     }

  }
  componentWillReceiveProps(nextProps){
    const { getSchool, score,searchmajor ,voluteercar} = nextProps;
    var  year = ['正在加载中...'],pc=['正在加载中...'],wl=['正在加载中...'],
    province=['正在加载中...'],PID=['正在加载中...'],
    professional=['正在加载中...'],min=['正在加载中...'],
    schoolCity=['正在加载中...'],schoolName=['正在加载中...'],
    schoolType=['正在加载中...'],major=['暂无数据'];
    // 获取最近十五年的数据
    for(var i = new Date().getFullYear()-15 ;i<new Date().getFullYear(); i++){
      year.push(i);
    }
    // 获取批次列表
    if(score.BatchList){
      pc =score.BatchList.data.pList.map((item)=>
        item.Name
      );
    }
    // 获取地区列表
    if(score.CityList){
        province = score.CityList.data.pList[0].ProvinceName;
        province = score.CityList.data.pList.map((item)=>
       {
         return item.ProvinceName;
       });
       schoolCity = score.CityList.data.pList.map((item)=>
       {
         return item.ProvinceName;
       });
    }
    // 获取大类列表
    if(score.ClassList){
    professional = score.ClassList.data.pList.map((item)=>{
      return item.Name;
     })

   }
  // 如果小类存在就保存到数组里面
  if( searchmajor.smallMajor.smallMajor ) {
    min = searchmajor.smallMajor.smallMajor.data.pList.map((item,i)=>{
      return item.specialname;
    })
  }
  // 获取学校名称
  if(score.SchoolName && score.SchoolName.data.S == 1){
    schoolName = score.SchoolName.data.SchoolList.map((item,i)=>{
      return item.schoolname;
    })
  }else if(score.SchoolName && score.SchoolName.data.S == 0){
    schoolName = [`${score.SchoolName.data.msg}`]
  }
// 获取学校类型
if(score.SchoolType){

  if(score.SchoolType.SchoolType && score.SchoolType.SchoolType.data.S == 1){
    schoolType = score.SchoolType.SchoolType.data.pList.map((item)=>{
      return item.Name;
    })
  }
}
  // 获取专业类型数据
    if (voluteercar.SchoolMajorList) {
      if (voluteercar.SchoolMajorList.SchoolMajorList && voluteercar.SchoolMajorList.SchoolMajorList.data.S == 1) {
        major = voluteercar.SchoolMajorList.SchoolMajorList.data.MajorList.map((item) => {
          return item.specialname;
        })
      }
    }
// major  变量
     switch(score.option){
       case 'year':this.setState({optionGroups:{option:year.reverse()}});break;
       case 'wl': this.setState({optionGroups:{option:score.wl}});break;
       case 'province': this.setState({optionGroups:{option:province}});break;
       case 'schoolCity': this.setState({optionGroups:{option:schoolCity}});break;
       case 'pc': this.setState({optionGroups:{option:pc}});break;
       case 'professional': this.setState({optionGroups:{option:professional}});break;
       case 'min': this.setState({optionGroups:{option:min}});break;
       case 'schoolName': this.setState({optionGroups:{option:schoolName}});break;
       case 'schoolType': this.setState({optionGroups:{option:schoolType}});break;
       case 'major': this.setState({optionGroups:{option:major}});break;
   }
  }
  handleChange =(name, value) => {

    const { score,dispatch } =this.props;
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      },name:value
    }));

    switch(score.option){
       case 'year':this.setState({year:value});break;
       case 'wl': this.setState({wl:value});break;
       case 'province':this.setState({province:value});break;
       case 'schoolCity':this.setState({schoolCity:value});break;
       case 'pc': this.setState({pc:value});break;
       case 'professional': this.setState({professional:value});break;
       case 'min': this.setState({min:value});break;
       case 'schoolName': this.setState({schoolName:value});break;
       case 'schoolType': this.setState({schoolType:value});break;
       case 'major': this.setState({major:value});break;
     }

     if(score.SchoolName && score.SchoolName.data.S == 1){

      if(score.option == 'schoolName'){
      //  console.log(this.state.optionGroups.option[this.state.optionGroups.option.length-1]==value,this.state.optionGroups.option[this.state.optionGroups.option.length-1],value,'啦啦')
      if(this.state.optionGroups.option[this.state.optionGroups.option.length-1] == value && this.state.optionGroups.option[this.state.optionGroups.option.length-1]){
       if(score.SchoolName.data.CurrentPage == score.SchoolName.data.PageCount){

         dispatch({type:'getRegion/toggleShow',payload:{open:true,info:'已经到底部了'}})
         return false;
       }

      dispatch({type:'score/GetSchooList',payload:{province:score.province,schoolType:score.schoolType,page:parseInt(score.SchoolName.data.CurrentPage)+1}})
      console.log(score.SchoolName.data.CurrentPage,)
       }

       }
     }

  };
 render(){
   const { optionGroups, valueGroups} = this.state;
   const { show } =this.props.getRegion;
   const { dispatch } = this.props;
    const maskStyle = {
      display:  show ? 'block' : 'none'
    };
  return(
    <div>
      <div className={styles.picker_modal_container}  style={maskStyle}>
          <div className={styles.picker_modal_mask} onClick={()=>{ dispatch({type:'getRegion/showPicker',payload:false })}} style={maskStyle}></div>
            <div className={classNames(styles.picker_modal,styles.picker_modal_toggle)} >
              <header>
                <div className={styles.title}>请选择</div>
                <a href="javascript:;" style={{lineHeight:'.4rem',width: '.4rem',textAlign: 'center',color:'#4b97ff'}} onClick={()=>this.togglePicker()}>确定</a>
              </header>
               <Picker
                  optionGroups={optionGroups}
                  valueGroups={valueGroups}
                  onChange={this.handleChange} />
           </div>
         </div>

    </div>
  )
}
}
