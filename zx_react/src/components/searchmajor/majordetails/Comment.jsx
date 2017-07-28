import React, { Component } from 'react'
import styles from './Comment.less'
import classNames from 'classnames'

export default class extends React.Component {
    render() {
        return (
            <div className={classNames(styles.CommentBox)}>
                <h3 className={classNames(styles.CommentTit)}>网友评论</h3>
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
                </ul>
                <div className={styles.submitBtn}>
                    <button>我有话说</button>
                </div>
            </div>
        )
    }
}
