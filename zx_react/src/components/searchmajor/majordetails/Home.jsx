import React, {Component} from 'react'
import styles from './Home.less'
import classNames from 'classnames'
import Navbar from '../../common/Navbar'
import Comments from './Comment'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Info: {},
      ifShow: false,
    }
  }

  render() {
    const {searchmajor, history} = this.props;
    const {searchResult} = this.props.searchmajor;
    let item;
    if (searchmajor.Info) {
      item = searchmajor.Info.Info;
    }
    if (item == undefined) {
      history.push(`/searchmajor`)
    }
    return (
      <div>
        {item == undefined ? '' : <div>
          <div className={classNames(styles.MajorName, 'clearfix')}>
            <h3 className={classNames(styles.majorTitle)}>{item.specialname ? item.specialname : item.zytype}</h3>
            <ul>
              <li>
                <span>专业代码&nbsp;</span>
                <span>{item.code ? item.code : '-'}</span>
              </li>
              <li>
                <span>开设院校&nbsp;</span>
                <span>{item.schoolNum ? item.schoolNum : '暂时没有一'}所</span>
              </li>
              <li>
                <span>主干学科&nbsp;</span>
                <span>{item.zytype ? item.zytype : '--'}</span>
              </li>
            </ul>
          </div>
          <div className={classNames(styles.MajorMsg, 'clearfix')}>
            <h3 className={classNames(styles.majorTitle)}>专业概括</h3>
            {
              item.jiuyefangxiang || item.peiyangmubiao || item.jieshao ? <ul>
                <li style={{paddingRight: '.1rem '}}>
                  <span>专业介绍</span>
                  <span onClick={() => {
                    this.setState({ifShow: !this.state.ifShow})
                  }} className={'ContText'} dangerouslySetInnerHTML={{__html: item.jieshao}}
                        style={{display: this.state.ifShow ? 'block' : '-webkit-box'}}></span>
                  <div onClick={() => {
                    this.setState({ifShow: !this.state.ifShow})
                  }}>{this.state.ifShow ? '收起' : '展示全部'}</div>
                </li>
                <li>
                  <span>就业方向&nbsp;</span>
                  <span>{item.jiuyefangxiang ? item.jiuyefangxiang : '--'}</span>
                </li>
                <li>
                  <span>培养目标&nbsp;</span>
                  <span>{item.peiyangmubiao ? item.peiyangmubiao : '--'}</span>
                </li>

              </ul> : <div style={{border: 'none', paddingTop: '.1rem'}}>
                <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
                  <use xlinkHref="#icon-zanwuneirong-"></use>
                </svg>
                <strong>暂无数据</strong></div>
            }
          </div>
        </div>}
      </div>
    )
  }
}
