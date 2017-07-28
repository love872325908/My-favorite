import React, {Component} from 'react'
import styles from './Home.less'
import classNames from 'classnames';
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.closeDialog = this.closeDialog.bind(this);
    this.onLinkUrl = this.onLinkUrl.bind(this)
  }

  closeDialog() {
    const {dispatch} = this.props;
    dispatch({
      type: 'voluteercar/saveDialog',
      payload: false
    })
    console.log(this.props.voluteercar)
  }

  onBuy(pid, money) {
    const {dispatch, history} = this.props;
    const {Money} = this.props.voluteercar;
    let mid;
    if (Money) {
      if (Money.Money && Money.Money.data != undefined) {
        mid = Money.Money.data.pList.map((item, index) => {
          return item.ID
        })
      }
    }
    dispatch({
      type: 'voluteercar/getOrderId',
      payload: {
        PaymentID: pid,
        PriceID: mid
      }
    })
    this.onLinkUrl()
  }

  onLinkUrl() {
    const {history, dispatch} = this.props;
    const {buyOrder} = this.props.voluteercar;
    let url;
    if (buyOrder) {
      if (buyOrder.buyOrder && buyOrder.buyOrder.data != undefined) {
        url = buyOrder.buyOrder.data.payUrl
        console.log(url)
        window.open(url)
      }
    }
  }

  render() {
    const {Money} = this.props.voluteercar;
    console.log(this.props.voluteercar)
    let money;
    if (Money) {
      if (Money.Money && Money.Money.data != undefined) {
        money = Money.Money.data.pList.map((item, index) => {
          return item.CurrentPrice
        })
      } else {
        bigCateList = '暂无数据'
      }
    }
    return (
      <div className={classNames(styles.buyPopuy, 'clearfix')}
           style={{'display': this.props.voluteercar.ifShow ? '' : 'none'}}>
        <div className={styles.shade} onClick={() => {
          this.closeDialog()
        }}>>
        </div>
        <div className={styles.buyBox}>
          <div className={styles.title}>
            <svg className="icon" aria-hidden="true" onClick={() => {
              this.closeDialog()
            }}>
              <use xlinkHref="#icon-cuowu1"></use>
            </svg>
            <span>付款方式</span>
          </div>
          <div className={styles.recharge}>
            <span>充值账号</span>
            <span>超人不会飞</span>
          </div>
          <div className={styles.payment}>
            <h3>付款方式</h3>
            <div className={styles.buyMethod}>
              <svg onClick={() => {
                this.onBuy(37, money)
              }} className="icon" aria-hidden="true">
                <use xlinkHref="#icon-weixinzhifu"></use>
              </svg>
              <svg onClick={() => {
                this.onBuy(28, money)
              }} className="icon" aria-hidden="true">
                <use xlinkHref="#icon-WePayLogo"></use>
              </svg>
            </div>
          </div>
          <div className={styles.money}>
            <span>需付款</span>
            <span>{money}元</span>
          </div>
        </div>
      </div>
    )
  }
}
