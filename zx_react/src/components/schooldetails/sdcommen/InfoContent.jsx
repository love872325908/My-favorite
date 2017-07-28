import React, {Component} from 'react'
import styles from '../Home.less'
import classNames from 'classnames'
let offsetHeight = [], max = 0;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifShow: false,
      index: 0,
      schooldetails: props.schooldetails,
      offsetHeightArr: []
    }
    this.refFunc = this.refFunc.bind(this);
    this.showText = this.showText.bind(this)
  }

  showText(index) {
    this.setState({
      index: index,
      ifShow: !this.state.ifShow
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({schooldetails: nextProps.schooldetails});
  }

  componentDidMount() {
    console.log(this)
  }

  componentWillUnmount() {
    console.log(this)
    console.log('--------this-----------')
    this.refFunc = null;
    console.log(this)
  }

  refFunc(e) {
    if (e.clientHeight) {
      offsetHeight.push(e.clientHeight)
      this.setState({
        offsetHeightArr: offsetHeight
      })
    }
  }

  render() {
    const {Introduce} = this.state.schooldetails;

    let obj = document.getElementsByClassName('ContText');
    console.log(offsetHeight,offsetHeight.length,max)
    if(offsetHeight.length == 0 && max == 0){
      if (obj) {
        for (let i = 0; i < obj.length; i++) {
          offsetHeight[i] = obj[i].lastChild.clientHeight;
        }
      }
      for (let i = 0; i < offsetHeight.length; i++) {
        if (max <= offsetHeight[i]) {
          max = offsetHeight[i];
        }else if (offsetHeight[i] == max - 3) {
          max = max - 3;
        }
      }
    }
    console.log(max)
    // console.log(EndMax)
    let Listitem;
    if (Introduce) {
      if (Introduce.length != 0 && Introduce.Introduce.data.S == '1') {
        Listitem = Introduce.Introduce.data.IntroduceList.map((item, index) => {
          return <li key={index}>
            <h3>{item.Title}</h3>
            <div onClick={() => {
              this.showText(index)
            }} className={'ContText'} dangerouslySetInnerHTML={{__html: item.Introduce}}
                 style={{display: this.state.ifShow && this.state.index == index ? 'block' : '-webkit-box'}}></div>
            <div style={{display: offsetHeight[index] == max ? 'block' : 'none'}} className={classNames()}>
              <span onClick={() => {
                this.showText(index)
              }}>{this.state.ifShow && this.state.index == index ? '收起' : '展示全部'}</span>
            </div>
          </li>
        })
      } else {
        Listitem = <div style={{border: 'none', paddingTop: '.1rem'}}>
          <svg className="icon" aria-hidden="true" style={{width: '100%', height: '.8rem'}}>
            <use xlinkHref="#icon-zanwuneirong-"></use>
          </svg>
          <strong>暂无数据</strong></div>
      }
    }

    return (
      <div className={classNames(styles.InfoContent, 'clearfix')}>
        <ul>
          {Listitem}
        </ul>
      </div>
    )
  }
}
