import React, {Component} from 'react';
import Navbar from '../common/Navbar'
import Category from './Category'
import {Link} from 'dva/router';
import styles from './Home.less';
import classNames from 'classnames';
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.hotSearch = this.hotSearch.bind(this)
    this.search = this.search.bind(this)
  }

  search() {
    const {dispatch, history} = this.props;
    if (this.refs.true.value != '') {
      dispatch({
        type: 'searchmajor/getMajorSearch',
        payload: {
          specialname: this.refs.true.value,
        }
      })
      history.push(`/searchResult`)
    }
  }

  hotSearch(str){
    const {dispatch, history} = this.props;
    console.log(str)
    dispatch({
      type: 'searchmajor/getMajorSearch',
      payload: {
        specialname: str
      }
    })
    history.push(`/searchResult`)
  }

  render() {
    return (
      <div className={classNames(styles.serchMajor)}>
        <Navbar {...this.props} title='搜专业' back="home"></Navbar>
        <div className={classNames(styles.navSearch)}>
          <input type="text" placeholder='搜索关键字' ref className={classNames(styles.serchInput)}/>
          <div style={{float: 'right', margin: '-.32rem .27rem 0 0 '}} onClick={() => this.search()}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-fangdajing"></use>
            </svg>
          </div>
          <div className={classNames(styles.hotSearch)}>
            热门搜索：
            <span onClick={() => {this.hotSearch('导游')}}>导游</span>&nbsp;
            <span onClick={() => {this.hotSearch('酒店管理')}}>酒店管理</span>&nbsp;
            <span onClick={() => {this.hotSearch('计算机应用技术')}}>计算机应用技术</span>
          </div>
        </div>
        <Category {...this.props} title='专业大类'></Category>
      </div>
    )
  }
}
