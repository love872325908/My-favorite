import React, { Component } from 'react'
import styles from './Home.less';
import classNames from 'classnames'

import Comments from '../searchmajor/majordetails/Comment'

export default class extends React.Component {
  render() {
    return (
      <div className={styles.userEl}>
        <ul>
          <li className={classNames('clearfix')}>
            <div className={classNames(styles.ComHeadBox, 'clearfix')}>
              <div className={classNames(styles.avatar)}>
              </div>
              <div className={classNames(styles.uName)}>
                <span>超人不会飞</span>
              </div>
            </div>
            <div className={classNames(styles.ComContent)}>
              <span>评论内容</span>
            </div>
            <div className={classNames(styles.ComTime, 'clearfix')}>
              <span>2017-02-27</span>
            </div>
          </li>
          <li className={classNames('clearfix')}>
            <div className={classNames(styles.ComHeadBox, 'clearfix')}>
              <div className={classNames(styles.avatar)}>
              </div>
              <div className={classNames(styles.uName)}>
                <span>超人不会飞</span>
              </div>
            </div>
            <div className={classNames(styles.ComContent)}>
              <span>评论内容</span>
            </div>
            <div className={classNames(styles.ComTime, 'clearfix')}>
              <span>2017-02-27</span>
            </div>
          </li>
          <li className={classNames('clearfix')}>
            <div className={classNames(styles.ComHeadBox, 'clearfix')}>
              <div className={classNames(styles.avatar)}>
              </div>
              <div className={classNames(styles.uName)}>
                <span>超人不会飞</span>
              </div>
            </div>
            <div className={classNames(styles.ComContent)}>
              <span>评论内容</span>
            </div>
            <div className={classNames(styles.ComTime, 'clearfix')}>
              <span>2017-02-27</span>
            </div>
          </li>
        </ul>
        <div className={styles.submitBtn}>
          <button>我要评价</button>
        </div>
      </div>
    )
  }
}
