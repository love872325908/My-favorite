import React, {Component} from 'react'
import styles from './Home.less';
import classNames from 'classnames'
import Buy from './Buy'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickProps: {
        display: 'none',
      },
      buyBoxHeight: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needConfirm) {
      this.setState(
        {
          clickProps: {
            display: 'none',
          }
        }
      );
    }
  }

  buyBtn() {
    const {dispatch} = this.props;
    'inline-block' == this.state.clickProps.display ? this.setState({clickProps: {display: 'none'}}) : this.setState({clickProps: {display: 'inline-block'}});
    this.state.clickProps.display;
    let height = document.body.clientHeight;
    this.setState({buyBoxHeight: height * .6});
    dispatch({
      type: 'voluteercar/saveDialog',
      payload: true,
    })
  }

  render() {
    return (
      <div className={styles.itdBox}>
        <div className={styles.itdTopBox}>
          专业定位(专业评测)1次+海选院校(录取可能性报告)4次+精选院校（数据查询）共80次，包含：（高校各专业分数线查询、专业开设院校查询、往年考生去向查询、根据分数/位次选学校）
        </div>
        <div className={styles.hintInfoBox}>
          <h3>温馨提示：</h3>
          <span>购卡后即可使用本系统功能，请妥善保管登陆账号。</span><br/>
          <span>本系统浙江、西藏考生无法使用。</span><br/>
          <span>2015年29省市高考录取数据已更新，提前批数据不全。</span><br/>
          <span>不含上海、北京、江西、江苏2015年专科批次录取数据。</span><br/>
          <span>不含安徽、海南2015年本科三批录取数据。</span>
        </div>
        <div className={styles.submitBtn}>
          <button onClick={this.buyBtn.bind(this)}>立即购买</button>
        </div>
      </div>
    )
  }
}
