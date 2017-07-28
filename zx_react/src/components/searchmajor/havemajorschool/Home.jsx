import React, { Component } from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import Navbar from '../../common/Navbar'
import SchoolList from './SchoolList'

export default class extends React.Component {
    render() {
        return (
            <div className={styles.SchoolListBox}>
                <SchoolList {...this.props}/>
            </div>
        )
    }
}
